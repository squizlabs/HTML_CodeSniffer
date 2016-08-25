module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON('./package.json')

    jshint:
      options:
        jshintrc: '.jshintrc'

      all: [
        'Standards/**/*.js'
        'Contrib/PhantomJS/*.js'
      ]

    uglify:
      debug:
        options:
          compress: false
          mangle: false
          beautify: true
          preserveComments: true
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js')
          footer: grunt.file.read('Contrib/Build/umd-footer.js')
        files:
          'build/HTMLCS.js': [
            'Standards/**/*.js'
            'HTMLCS.js'
            'HTMLCS.Util.js'
            'Contrib/PhantomJS/runner.js'
            'Auditor/HTMLCSAuditor.js'
          ]
      dist:
        options:
          banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' + grunt.file.read('Contrib/Build/umd-header.js')
          footer: grunt.file.read('Contrib/Build/umd-footer.js')
        files:
          'build/HTMLCS.js': [
            'Standards/**/*.js'
            'HTMLCS.js'
            'HTMLCS.Util.js'
            'Contrib/PhantomJS/runner.js'
            'Auditor/HTMLCSAuditor.js'
          ],

    copy:
      dist:
        files: [
          {
            expand: true
            flatten: true,
            src: 'Auditor/HTMLCSAuditor.css'
            rename: (dest, src) -> dest + '/HTMLCS.css'
            dest: 'build'
            filter: 'isFile'
          },
          {
            expand: true
            flatten: true,
            src: 'Auditor/Images/*'
            dest: 'build/Images'
            filter: 'isFile'
          },
          {
            expand: true
            flatten: true,
            src: 'licence.txt'
            dest: 'build'
            filter: 'isFile'
          }
        ]
    watch:
      jade:
        files: ['<%= jshint.all %>']
        tasks: ['jshint:all']

  grunt.file.setBase './'
  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', ['jshint']
  grunt.registerTask 'build',   ['uglify:dist', 'copy:dist']
  grunt.registerTask 'build-debug', ['uglify:debug', 'copy:dist']
