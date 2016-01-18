module.exports = (grunt)->
  grunt.initConfig
    pkg: grunt.file.readJSON('../../package.json')

    jshint: 
      options: 
        jshintrc: 'Contrib/Grunt/.jshintrc'

      all: [
        'Standards/**/*.js'
        'Contrib/PhantomJS/*.js'
      ]

    uglify:
      options: 
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */\n' 
      dist:
        files: 
          'build/HTMLCS.js': [
            'Standards/**/*.js'
            'HTMLCS.js'
            'Contrib/PhantomJS/runner.js'
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

  grunt.file.setBase '../../'
  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', ['jshint']
  grunt.registerTask 'build',   ['uglify:dist', 'copy:dist']
