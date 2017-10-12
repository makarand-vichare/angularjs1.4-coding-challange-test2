/*jslint node: true */
"use strict";


module.exports = function(grunt) {
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
   
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 8080
        }
      }
    },
    watch: {
      dev: {
        files: [ 'Gruntfile.js', 'app/*.js', '*.html' ],
        tasks: [],
        options: {
          atBegin: true
        }
      }
      }  
  });
  
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-connect');
//   grunt.loadNpmTasks('grunt-contrib-compress');
//   grunt.loadNpmTasks('grunt-contrib-concat');
//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-html2js');
   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-bower-task');
//   grunt.loadNpmTasks('grunt-karma');
  
  grunt.registerTask('dev', [ 'connect:server', 'watch:dev' ]);
 // grunt.registerTask('test', [ 'bower', 'jshint', 'karma:continuous' ]);
 // grunt.registerTask('minified', [ 'bower', 'connect:server', 'watch:min' ]);
 // grunt.registerTask('package', [ 'bower', 'jshint', 'karma:unit', 'html2js:dist', 'concat:dist', 'uglify:dist',
 //   'clean:temp', 'compress:dist' ]);
};