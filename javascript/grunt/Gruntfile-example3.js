/*
Src: http://www.codebelt.com/typescript/my-typescript-workflow-examples/
GRUNT PLUGINS
grunt-env & grunt-preprocess
These two plugins work together to create an index.html file for both our development and production environment. It will take the config.html file and include/exclude section that we have outlined.
grunt-json
This plugin will take your JSON files and convert them into JavaScript files. For example if you had a JSON file that had a list of all countries that was never going to change. You could eliminate that HTTP request by making the file JavaScript and minifing it together with your other JavaScript code. You can read more about this on my Compile JSON files into Javascript Tutorial.
grunt-contrib-handlebars
This plugin will take your Handlebar Templates and Partials and precompile them into JavaScript for a performance boost. If you like to use Underscore Templates you can check out my Precompiling JavaScript Underscore Templates Tutorial.
grunt-typescript
This plugin will take your TypeScript files and compile them into JavaScript. It will also create sourcemaps for the TypeScript files. You can read more about this in my TypeScript Source Maps Example and/or TypeScript Source Maps After Uglify tutorials.
grunt-contrib-clean
This plugin will delete all the files in the production (web) folder so when we do another build for production we know there are no extra files from a previous build that were removed.
grunt-contrib-copy
This plugin will copy specified files from the development folder into the production folder so we don’t have to add files manually every time we do a build to production.
grunt-usemin
This plugin has two parts to it and maybe confusing at first. It also requires the grunt-contrib-concat, grunt-contrib-uglify & grunt-contrib-cssmin plugins. The two parts are:
useminPrepare
The useminPrepare part of the usemin plugin looks at the html file and checks for a build:js or build:css code block. It will take those files found in the code block(s) and concat them together and then runs uglify for js and/or cssmin for css files. useminPrepare requires grunt-contrib-uglify, grunt-contrib-concat, and grunt-contrib-cssmin plugins to be installed. Which is listed in the package.json file.
usemin
The usemin part will remove the code block(s) and replace that area with the single file path in the html file.
grunt-banner
This plugin allows you to prepend or append comments to files. I prepend the version number and date to my minified files whenever I do a production build.
grunt-manifest
The plugin allow you to create a Application Cache Manifest file from select folders and file types. This is only needed if you are making an application that needs to work offline.
grunt-express & grunt-open
These two plugins will creates a node.js Express Server to test our code in a server like environment and will open the index.html file in our default browsers.
grunt-contrib-watch
This plugin allows you to watch certain files and if they change it will kick off other tasks. In this TypeScript Workflow I watch the TypeScript and Handlebar files and have them re-compile every time I save my edits.
grunt-contrib-yuidoc
This plugin will generate YUIDoc’s from the yuidoc comments in your code files.

*/

module.exports = function(grunt) {
 
    // Load Grunt tasks declared in the package.json file.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
 
    // Project configuration.
    grunt.initConfig({
 
        /**
         * This will load in our package.json file so we can have access
         * to the project name and appVersion number.
         */
        pkg: grunt.file.readJSON('package.json'),
 
        /**
         * Constants for the Gruntfile so we can easily change the path for our environments.
         */
        BASE_PATH: '',
        DEVELOPMENT_PATH: 'src/',
        PRODUCTION_PATH: 'web/',
 
        /**
         * A code block that will be added to our minified code files.
         * Gets the name and appVersion and other info from the above loaded 'package.json' file.
         * @example <%= banner.join("\\n") %>
         */
        banner: [
                 '/*',
                 '* Project: <%= pkg.name %>',
                 '* Version: <%= pkg.appVersion %> (<%= grunt.template.today("yyyy-mm-dd") %>)',
                 '* Development By: <%= pkg.developedBy %>',
                 '* Copyright(c): <%= grunt.template.today("yyyy") %>',
                 '*/'
        ],
 
        /**
         * The different constant names that will be use to build our html files.
         * @example <!-- @if NODE_ENV == 'DEVELOPMENT' -->
         */
        env: {
            src: {
                NODE_ENV : 'DEVELOPMENT'
            },
            web : {
                NODE_ENV : 'PRODUCTION'
            }
        },
 
        /**
         * Allows us to pass in variables to files that have place holders so we can similar files with different data.
         * This plugin works with the 'env' plugin above.
         * @example <!-- @echo appVersion --> or <!-- @echo filePath -->
         */
        preprocess : {
            // Task to create the index.html file that will be used during development.
            // Passes the app version and creates the /index.html
            src : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            },
            // Task to create the index.html file that will be used in production.
            // Passes the app version and creates the /index.html
            web : {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= PRODUCTION_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.appVersion %>',
                        filePath: ''
                    }
                }
            }
        },
 
        /**
         * Cleans or deletes our production folder before we create a new production build.
         */
        clean: {
            dist: ['<%= PRODUCTION_PATH %>']
        },
 
        /**
         * Copies certain files over from the development folder to the production folder so we don't have to do it manually.
         */
        copy: {
            web:  {
                files: [
                    // Copy favicon.ico file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: 'favicon.ico', dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the media folder from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', src: ['assets/media/**'], dest: '<%= PRODUCTION_PATH %>' },
                    // Copy the index.html file from development to production
                    { expand: true, cwd: '<%= DEVELOPMENT_PATH %>', dest: '<%= PRODUCTION_PATH %>', src: ['index.html'], filter: 'isFile', dot: true }
                ]
            }
        },
 
        /**
         * Prepends the banner above to the minified files.
         */
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner.join("\\n") %>',
                    linebreak: true
                },
                files: {
                    src: [
                        '<%= PRODUCTION_PATH %>' + 'assets/scripts/app.min.js',
                        '<%= PRODUCTION_PATH %>' + 'assets/styles/app.min.css'
                    ]
                }
            }
        },
 
        /**
         * Turns any JSON files into JavaScript files.
         */
        json: {
            web: {
                options: {
                    namespace: 'JSON_DATA',
                    includePath: false,
                    processName: function(filename) {
                        return filename.toLowerCase();
                    }
                },
                src: ['<%= DEVELOPMENT_PATH %>' + 'assets/data/**/*.json'],
                dest:  '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/compiled/json.js'
            }
        },
 
        /**
         * Compiles the Handlebars templates into Javascript.
         * http://handlebarsjs.com/
         */
        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    // Registers all files that start with '_' as a partial.
                    partialRegex: /^_/,
                    // Shortens the file path for the templates.
                    processName: function(filename) {
                        return filename.slice(filename.indexOf("template"), filename.length);
                    },
                    // Shortens the file path for the partials.
                    processPartialName: function(filePath) {
                        return filePath.slice(filePath.indexOf("template"), filePath.length);
                    }
                },
                files: {
                    '<%= DEVELOPMENT_PATH %>assets/scripts/compiled/templates.tmpl.js': ['<%= DEVELOPMENT_PATH %>' + 'assets/templates/**/*.hbs']
                }
            }
        },
 
        /**
         * Compiles the TypeScript files into one JavaScript file.
         */
        typescript: {
            main: {
                src: ['<%= DEVELOPMENT_PATH %>' + 'assets/scripts/TestApp.ts'],
                dest: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/compiled/app.js',
                options: {
                    target: 'es3', //or es5
                    base_path: '',
                    sourcemap: true,
                    declaration: false,
                    nolib: false,
                    comments: false
                }
            }
        },
 
        /**
         * The useminPrepare part of the usemin plugin looks at the html file and checks for a build:js or build:css code block.
         * It will take those files found in the code block(s) and concat them together and then runs uglify for js and/or cssmin for css files.
         * useminPrepare requires grunt-contrib-uglify, grunt-contrib-concat, and grunt-contrib-cssmin plugins to be installed. Which is listed in the package.json file.
         *
         * The usemin part will remove the code block(s) and replace that area with the single file path in the html file.
         */
        useminPrepare: {
            html: ['<%= DEVELOPMENT_PATH %>' + 'index.html'],
            options: {
                dest: '<%= PRODUCTION_PATH %>'// Moves the single concatenated files to production.
            }
        },
        usemin: {
            html: ['<%= PRODUCTION_PATH %>' + 'index.html'],
            options: {
                dirs: ['<%= PRODUCTION_PATH %>']
            }
        },
 
        /**
         * Removes all comments from the production index.html file. I can also remove all whitespace if desired.
         */
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: {
                    '<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>' + 'index.html'
                }
            }
        },
 
        /**
         * Creates a Cache Manifest file.
         */
        manifest: {
            generate: {
                options: {
                    basePath: '<%= PRODUCTION_PATH %>',
                    exclude: [
                        'assets/media/images/moblie-icons/icon-144x144.png',
                        'assets/media/images/moblie-icons/icon-100x100.png',
                        'assets/media/images/moblie-icons/icon-29x29.png',
                        'assets/media/images/moblie-icons/icon-50x50.png',
                        'assets/media/images/moblie-icons/icon-58x58.png',
                        'assets/media/images/moblie-icons/icon-72x72.png'
                    ],
                    preferOnline: false,
                    verbose: true,
                    timestamp: true,
                    master: []
                },
                src: [
                    'assets/data/**/*.json',
                    'assets/media/images/**/*.jpg',
                    'assets/media/images/**/*.png',
                    'assets/scripts/**/*.js',
                    'assets/styles/**/*.css'
                ],
                dest: '<%= PRODUCTION_PATH %>' + 'offline.appcache'
            }
        },
 
        /**
         * YUIDoc plugin that will generate documentation from our YUI comments.
         */
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.appVersion %>',
                url: '<%= pkg.homepage %>',
                options: {
                    paths: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/',
                    outdir: '<%= BASE_PATH %>docs',
                    themedir: '',
                    extension: '.ts',                                   // Default '.js' <comma-separated list of file extensions>
                    exclude: ''
                }
            }
        },
 
        /**
         * Creates a node.js Express Server to test our code in a server like environment.
         * Note: We are using the watch task to keep the server running.
         */
        express: {
            src: {
                options: {
                    port: 8000,
                    hostname: "0.0.0.0",
                    bases: ['<%= DEVELOPMENT_PATH %>'],
                    livereload: true
                }
            },
            web: {
                options: {
                    port: 8001,
                    hostname: "0.0.0.1",
                    bases: ['<%= PRODUCTION_PATH %>'],
                    livereload: true
                }
            }
        },
 
        /**
         * Opens the index.html file in the default browser after the node.js Express Server is running.
         */
        open: {
            src: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.src.options.port%>'
            },
            web: {
                // Gets the port from the connect configuration
                path: 'http://localhost:<%= express.web.options.port%>'
            }
        },
 
        /**
         * Watches files and will run task(s) when files are changed. It will also reload/refresh the browser.
         */
        watch: {
            css: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/styles/**/*.css',
                ]
            },
            src: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/**/*.ts',
                    '<%= DEVELOPMENT_PATH %>' + 'config.html',
                    '<%= DEVELOPMENT_PATH %>' + 'assets/templates/**/*.hbs'
                ],
                tasks: ['src']
            }
        }
 
    });
 
    /**
     * Grunt tasks:
     *
     * grunt        (Will build and run your development code/server)
     * grunt web    (Will build and run your production code/server)
     * grunt doc    (Will generate the YUI documentation from the code comments)
     */
    grunt.registerTask('default', [
        'server'
    ]);
 
    grunt.registerTask('server', [
        'src',
        'express:src',
        'open:src',
        'watch'
    ]);
 
    grunt.registerTask('src', [
        'env:src',
        'preprocess:src',
        'json',
        'handlebars',
        'typescript'
    ]);
 
    grunt.registerTask('web', [
        'env:web',
        'preprocess',
        'json',
        'handlebars',
        'typescript',
        'clean',
        'copy',
        'useminPrepare', 'concat', 'uglify', 'cssmin',
        'usemin',
        'usebanner',
        'htmlmin',
        'manifest',
        'open:web',
        'express:web',
        'express-keepalive'
    ]);
 
    grunt.registerTask('doc', [
        'yuidoc'
    ]);
 
};