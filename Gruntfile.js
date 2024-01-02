
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('./package.json'),
        eslint: {
            target: ['Standards/**/*.js', 'Contrib/PhantomJS/*.js']
        },
        browserify:{
            dist:{
                src: ['index.js'],
                dest: 'build/HTMLCS.js',
                options:{
                    browserifyOptions: {
                        debug: true
                    },
                    require: [
                    ],
                }
            }
        },
        uglify: {
            debug: {
                options: {
                    compress: false,
                    mangle: false,
                    beautify: true,
                    preserveComments: true,
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/all.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js']
                }
            },
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/all.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/HTMLCSAuditor.js']
                }
            },
            bookmarklet: {
                options: {
                    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/header-bookmarklet.js'),
                    footer: grunt.file.read('Contrib/Build/umd-footer.js')
                },
                files: {
                    'build/HTMLCS.js': ['Translations/*.js', 'Standards/all.js', 'HTMLCS.js', 'HTMLCS.Util.js', 'Contrib/PhantomJS/runner.js', 'Auditor/Auditor_with_beacon.js']
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/HTMLCSAuditor.css',
                        rename: function (dest, src) {
                            return dest + '/HTMLCS.css';
                        },
                        dest: 'build',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'Auditor/Images/*',
                        dest: 'build/Images',
                        filter: 'isFile'
                    }, {
                        expand: true,
                        flatten: true,
                        src: 'licence.txt',
                        dest: 'build',
                        filter: 'isFile'
                    }
                ]
            }
        }
    });

    grunt.file.setBase('./');
    require('load-grunt-tasks')(grunt);

    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('default', ['eslint']);
    grunt.registerTask('build', ['exportVars', 'uglify:dist', 'copy:dist']);
    grunt.registerTask('build-bookmarklet', ['exportVars', 'uglify:bookmarklet', 'copy:dist']);

    grunt.registerTask('exportVars', function() {
        var catted = '';

        grunt.file.expand({ filter: 'isFile' }, 'Standards/WCAG2AAA/**/**/**/*.js')
            .forEach(function(file) {
                catted += grunt.file.read(file) + '\n';
                var parts = file.split("/"),
                    varName = "HTMLCS_" + parts.slice(1).join('_').replace(/[.]js$/, "");
                if(varName.match(/_ruleset$/))
                    varName = varName.replace(/_ruleset$/, "");
                catted += "module.exports." + varName + " = " + varName + ";\n";
            }
        );
        grunt.file.write('Standards/all.js', catted, { encoding: 'utf8' })
    });
    
    return grunt.registerTask('build-debug', ['exportVars', 'browserify:dist', 'copy:dist']);
};
