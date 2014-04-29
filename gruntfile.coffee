module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')

    jshint: 
      options: 
        jshintrc: '.jshintrc'

      all: [
        'Standards/**/*.js'
        'PhantomJS/*.js'
      ]

    uglify:
      options: 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' 
      dist:
        files: 
          'dist/HTMLCS.min.js': [
            'Standards/**/*.js'
            'HTMLCS.js'
            'PhantomJS/runner.js'
            'Auditor/HTMLCSAuditor.js'
          ]

    copy:
      dist:
        files: [
          {
            expand: true
            flatten: true,
            src: 'Auditor/HTMLCSAuditor.css'
            rename: (dest, src) -> dest + '/HTMLCS.css'
            dest: 'dist'
            filter: 'isFile'
          },
          {
            expand: true
            flatten: true,
            src: 'Auditor/Images/*'
            dest: 'dist/Images'
            filter: 'isFile'
          }
        ]
    watch:
      jade:
        files: ['<%= jshint.all %>']
        tasks: ['jshint:all']

  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', ['jshint']
  grunt.registerTask 'build',   ['uglify:dist', 'copy:dist']