module.exports = function(grunt){

    grunt.initConfig({

        /*Constants*/
        credits: grunt.template.process("/**\n * Author: <%= name %>\n * Date: <%= grunt.template.today('yyyy-mm-dd') %> \n **/\n",{data:{name:"Victor Chavarro"}}),

        /*MINIFIERS*/
        uglify:{
            options:{
                mangle: true,
                compress: true,
                beautify: false,
                sourceMap: "app/common/ui/js/dist/application.map",
                banner: "<%= credits %>"
            },
            //Compress all js in a folder
            scripts:{
                src: "app/common/ui/js/*.js",
                dest: "app/common/ui/js/dist/",
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            },
            //compress specific file in a folder
            concatFile:{
                src: "app/common/ui/js/dist/concatFile.js",
                dest: "app/common/ui/js/dist/scripts.min.js"
            }
        },
        cssmin:{
            options:{
                banner: "<%= credits %>"
            },
            style:{
                src: "app/common/ui/css/style.css",
                dest: "app/common/ui/css/dist/style.min.css"
            }
        },

        /*CHECK JAVASCRIPT*/
        jshint:{
            options:{
                eqeqeq: true,
                curly: true,
                undef: true,
                //unused: true,
                camelcase: true,
                freeze: true,
                maxdepth: 3
            },
            target: {
                src: "app/common/ui/js/*.js"
            }
        },

        /*TYPESCRIPT COMPILER*/
        ts: {
            options: {
                // 'es3' (default) | 'es5'
                target: 'es3',
                // Use amd for asynchonous loading or commonjs  'amd' (default) | 'commonjs'
                module: 'commonjs',
                // Generate a source map file for each result js file (true (default) | false)
                sourcemap: true,
                // Generate a declaration .d.ts file for each resulting js file (true | false  (default))
                declaration: false,
                // ??? (true | false (default))
                nolib: false,
                // Leave comments in compiled js code (true | false (default))
                comments: false,
                // Print the tsc command (true | false (default))
                verbose: true
            },
            work: {
                // The source typescript files, see : http://gruntjs.com/configuring-tasks#files
                src: ['app/common/ui/ts/*.ts'],
                // If specified, generate an out.js file which is the merged js file
                outDir: 'app/common/ui/js/',
                // Override the default options, see : http://gruntjs.com/configuring-tasks#options
                options: {
                    sourcemap: false,
                    declaration: false
                }
            }
        },

        /*RESET FOLDERS*/
        clean:{
            target:['app/common/ui/js/dist','app/common/ui/css/dist']
        },

        /*CONCAT FILES*/
        concat:{
            options:{
                separator: '\n\n',
                banner: "<%= credits %>"
            },
            distribution:{
                src: ["app/common/ui/js/*.js"],
                dest: "app/common/ui/js/dist/concatFile.js"
            }
        },

        /*LIVE COMPILERS*/
        watch:{
            js:{
                files:["app/common/ui/js/*.js"],
                tasks:['jshint','uglify']
            },
            css:{
                files:["app/common/ui/css/*.css"],
                tasks:['cssmin']
            },
            typescriptCompiler:{
                files:["app/common/ui/ts/*.ts"],
                tasks:['ts','jshint','uglify:scripts']
            }
        }
    });



    grunt.registerTask("createDistFolder","Creating distribution folder",function(){
        grunt.log.subhead("CREATING DISTS FOLDER... ");
        grunt.file.mkdir("app/common/ui/js/dist");
        grunt.file.mkdir("app/common/ui/css/dist");
        grunt.log.oklns("FOLDERS ARE COMPLETE");
    });

    grunt.registerTask("distribution",['ts','jshint','clean','createDistFolder','concat','uglify:concatFile','cssmin']);
    grunt.registerTask("default",['ts','jshint','clean','createDistFolder','uglify:scripts','cssmin']);

    grunt.loadNpmTasks('grunt-contrib-uglify'); //minify js files
    grunt.loadNpmTasks('grunt-contrib-cssmin'); //minify css files
    grunt.loadNpmTasks('grunt-contrib-jshint'); //find errors
    grunt.loadNpmTasks('grunt-contrib-clean');  //clean folders files that don't want
    grunt.loadNpmTasks('grunt-contrib-watch');  //watch changes and run task automatically
    grunt.loadNpmTasks('grunt-contrib-concat'); //minify js files
    grunt.loadNpmTasks('grunt-ts');  //typescript

};