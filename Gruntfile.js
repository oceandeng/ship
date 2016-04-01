/* 
* @Author: ocean
* @Date:   2015-09-10 13:48:00
* @Last Modified by:   ocean_deng
* @Last Modified time: 2016-03-15 15:44:48
*/

'use strict';

module.exports = function(grunt){

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	var config = {
		style: 'public',
		app: ''
	}

	grunt.initConfig({
		config: config,

		//--- watch
		watch: {
			jade: {
				files: ['views/{,/*}*.js'],
				options: {
					livereload: true
				}
			},
			js: {
				files: ['public/{,/*}*.js', 'routes/{,/*}*.js'],
				options: {
					livereload: true
				}
			},
			sass: {
				files: ['<%= config.style %>/sass/{,*/}*.{scss,sass}'],
				tasks: ['sass:dist']
			},
			uglify: {
				files: ['public/javascripts/{,*/}*.js'],
				tasks: ['uglify:my_target']
			}
		},
		
		//--- Compiles Sass to CSS and generates necessary files if requested
		sass: {
			options: {
				sourcemap: 'none',
				style: 'compressed'
			},
			dist: {
				files: [{
					expand: true,
					cwd: '<%= config.style %>/sass',
					src: ['{,*/}*.{scss,sass}'],
					dest: '<%= config.style %>/stylesheets',
					ext: '.css'
				}]
			}
		},

		uglify: {
			my_target: {
				files: [{
					expand: true,
					cwd: 'public/javascripts',
					src: '**/*.js',
					dest: 'public/uglify'
				}]
			}
		},

		//--- nodemon
		nodemon:{
			dev:{
				options:{
					file:'app.js',
					args:[],
					ignoredFiles:['README.md','node_modules/**','.DS_Store'],
					watchedExtensions:['js'],
					watchedFolder:['./'],
					debug:true,
					delayTime:1,
					env:{
						PORT:3000
					},
					cwd:__dirname
				}
			}
		},

		//--- concurrent
		concurrent:{
			// miss uglify
			tasks:['nodemon', 'watch', 'sass:dist', 'uglify'],
			options:{
				logConcurrentOutput:true
			}
		}
	});

	grunt.registerTask('default', [
		'concurrent'
	]);
	grunt.registerTask('build', [
		'uglify'
	]);
};