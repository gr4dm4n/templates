module.exports = function(grunt){

    grunt.initConfig({

		/*SASS COMPILER*/
        sass:{
            dev: {
                files: {
                    // destination         // source file
                    "ts/app/ui/css/test.css" : "ts/app/ui/css/test.scss"
                }
            }
        },

        /*LIVE COMPILERS*/
        watch:{
            sass:{
                files: "ts/app/ui/css/*.scss",
                tasks: ['sass']
            }
        }
    });

	/*LIBRERIES*/
    grunt.loadNpmTasks('grunt-contrib-watch');  //watch changes and run task automatically
    grunt.loadNpmTasks('grunt-contrib-sass'); // SASS compiler


};
