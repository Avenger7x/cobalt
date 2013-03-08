'use strict';
var path = require('path'),
	lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

function folderMount(connect, point){
	return connect.static(path.resolve(point));
}

module.exports = function(grunt){
	grunt.initConfig({
		connect: {
			options: {
				port: 9000,
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect){
						return [lrSnippet, folderMount(connect, '.')];
					}
				}
			}
		},
		watch: {
			fred: {
				files: 'examples/*',
				tasks: ['livereload']
			}
		}
	});


	grunt.loadNpmTasks('grunt-regarde');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');

	grunt.renameTask('regarde', 'watch');

	grunt.registerTask('server', ['livereload-start', 'connect', 'watch']); // "open" task?
};