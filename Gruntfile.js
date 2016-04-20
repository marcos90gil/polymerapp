module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        concat: {
            options: {
                separator: '\n;',
                process: false,
                stripBanners: {
                    block: true
                }
            },
            app: {
                src: [
                    'public/bower_components/moment/moment.js',
                    'public/scripts/**/*.js',
                    'public/scripts/*.js'
                ],
                dest: 'public/dist/app.js'
            }
        },

        uglify: {
            options: {
                sourceMap: true
            },
            built: {
                files: {
                    'public/dist/app.min.js': ['public/dist/app.js']
                }
            }
        },

        less: {
            style: {
                files: { //archivos a compilar
                    "public/dist/style.css": "public/styles/style.less" //destino: origen
                }
            }
        },

        watch: {
            js: {
                files: ['public/scripts/**/*.js', 'public/scripts/*.js'],
                tasks: ['concat']
            },
            styles:{
            files:["public/styles/*.less"], //observa cualquier cambio en archivos LESS
            tasks:["less"], //ejecuta la compilación de LESS
            options:{
                spawn: false //para que no se quede tostado (¿?)
                }
            }
        }

    });

    // plugins
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // default task(s).
    grunt.registerTask('default', ['less', 'concat', 'watch']);
    grunt.registerTask('prod', ['less', 'concat', 'uglify']);

};