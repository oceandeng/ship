/* 
* @Author: ocean
* @Date:   2015-09-10 13:48:00
* @Last Modified by:   ocean
* @Last Modified time: 2015-10-20 10:39:55
*/

'use strict';

module.exports = function(grunt){

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt);

	var config = {
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
			tasks:['nodemon','watch'],
			options:{
				logConcurrentOutput:true
			}
		}
	});

	grunt.registerTask('default', [
		'concurrent'
	]);
};