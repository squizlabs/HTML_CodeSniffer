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
          ]

    watch:
      jade:
        files: ['<%= jshint.all %>']
        tasks: ['jshint:all']

  require('load-grunt-tasks') grunt

  grunt.registerTask 'default', ['jshint']
  grunt.registerTask 'build',   ['uglify:dist']