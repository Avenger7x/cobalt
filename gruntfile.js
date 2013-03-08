'use strict';
var path = require('path'),
	lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

module.exports = function(grunt){
	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-mocha-test');

	grunt.renameTask('regarde', 'watch');

	grunt.initConfig({
		connect: {
			options: {
				port: 9000,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect){
						return [lrSnippet, connect.static(path.resolve('.'))];
					}
				}
			}
		},
		watch: {
			livereload: {
				files: 'examples/*',
				tasks: ['livereload']
			},
			tests: {
				files: 'test/**/*.js',
				tasks: ['jshint:tests', 'mochaTest']
			}
		},
		mochaTest: {
			files: ['test/**/*.js']
		},
		mochaTestConfig: {
			options: {
				reporter: 'spec'
			}
		},
		jshint: {
			options: {
				asi: true,
				boss: true,
				curly: true,
				undef: true,
				nomen: true,
				eqeqeq: true,
				newcap: true,
				unused: true,
				onevar: true,
				trailing: true,
				loopfunc: true,
				maxdepth: 3,
				funcscope: true
			},
			tests: {
				options: {
					globals: {
						require: true,
						describe: true,
						it: true
					}
				},
				files: {
					src: ['test/**/*.js']
				}
			}
		}
	});

	grunt.registerTask('server', ['livereload-start', 'connect', 'watch:livereload']); // "open" task?
	grunt.registerTask('test', ['watch:tests', 'mochaTest']);
};