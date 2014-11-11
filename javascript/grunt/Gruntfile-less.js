module.exports = function(grunt){

    grunt.initConfig({

         credits: grunt.template.process("/**\n * Author: <%= name %>\n * Date: <%= grunt.template.today('yyyy-mm-dd') %> \n **/\n",{data:{name:"Victor Chavarro"}}),

        /*LESS COMPILER*/
        less: {
            development: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true
                   /* compress: true*/
                },
                files: {
                    "ts/app/ui/css/result.css": "ts/app/ui/css/style.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/css"],
                    cleancss: true,
                    modifyVars: {
                        imgPath: '"http://mycdn.com/path/to/images"',
                        bgColor: 'red'
                    }
                },
                files: {
                    "path/to/result.css": "path/to/source.less"
                }
            }
        },

        cssmin:{
            options:{
                banner: "<%= credits %>"
            },

            production:{
                files: [{
                    expand: true,
                    cwd: 'ts/app/ui/css/',
                    src: ['*.css', '!*.min.css'],
                    dest: 'ts/app/ui/css/',
                    ext: '.min.css'
                }]
            }
        },

        /*LIVE COMPILERS*/
        watch:{
            less:{
                files: "ts/app/ui/css/*.less",
                tasks: ['less:development']
            }
        }
    });

	/*LIBRERIES*/
    grunt.loadNpmTasks('grunt-contrib-watch');  //watch changes and run task automatically
    grunt.loadNpmTasks('grunt-contrib-less'); // LESS compiler
         grunt.loadNpmTasks('grunt-contrib-cssmin'); //minify css files


};
