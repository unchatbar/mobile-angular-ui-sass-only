'use strict';

var path = require('path');

module.exports = function (grunt) {

  // Load relevant grunt tasks
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-less-to-sass');

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Convert less CSS files to SASS (.scss) files
    lessToSass: {
      convert: {
        files: [{
          expand: true,
          cwd: 'bower_components/mobile-angular-ui/src/less',
          src: ['*.less'],
          ext: '.scss',
          dest: 'scss'
        }],
        options: {
          excludes: ['@import'],
          replacements: [{
            pattern: /@import\s+["'](.+?)(\.less)?["']/gi,
            replacement: function (match, filepath) {
              filepath = filepath.replace(/^font-awesome\/less\/(.*)/, 'components-font-awesome/scss/$1');
              filepath = filepath.replace(/^bootstrap\/less\/(.*)/, 'bootstrap-sass-only/scss/bootstrap/$1');
              filepath = filepath.replace(/^lib\/(.*)/, 'mobile-angular-ui-base/$1');
              filepath = filepath.replace(/^migrate\/(.*)/, 'mobile-angular-ui-migrate/$1');
              return '@import \'' + filepath + '\'';
            },
            order: 2
          }]
        }
      },
      lib: {
        files: [{
          expand: true,
          cwd: 'bower_components/mobile-angular-ui/src/less/lib',
          src: ['*.less'],
          ext: '.scss',
          dest: 'scss/mobile-angular-ui-base',
          rename: function (dest, matchedSrcPath) {
            return path.join(dest, '_' + matchedSrcPath);
          }
        }]
      },
      migrate: {
        files: [{
          expand: true,
          cwd: 'bower_components/mobile-angular-ui/src/less/migrate',
          src: ['*.less'],
          ext: '.scss',
          dest: 'scss/mobile-angular-ui-migrate',
          rename: function (dest, matchedSrcPath) {
            return path.join(dest, '_' + matchedSrcPath);
          }
        }]
      }
    },

    // Compile Sass to CSS using Compass
    compass: {
      dist: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          importPath: './bower_components'
        }
      }
    }

  });

  // Define additional tasks
  grunt.registerTask('default', [
    'lessToSass',
    'compass'
  ]);

};
