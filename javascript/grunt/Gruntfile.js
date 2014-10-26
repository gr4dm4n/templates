module.exports = function(grunt){ 

  grunt.initConfig({

    /*Templating*/
    pkg: grunt.file.readJSON("package.json"),
    strName: grunt.template.process("Author: <%= name %>",{data:{name:"VIANCH"}}),
    
    /*CONFIGURE TASK BY TAKS*/

    uglify:{
      options:{
        mangle: true,
        compress: true,
        sourceMap: "dest/application.map",
        banner: "/* <%= grunt.template.today('yyyy-mm-dd') %> / <%= strName %> | <%= pkg.license %> | <%= pkg.name %> */\n"
      },
      target:{
        src:  "dest/application.js",
        dest: "dist/application.min.js"
      },
      /*victor:{
        src: "src/util.js",
        dest: "dist/util.min.js"
      }*/
    },
    jshint:{
      options:{
        //jshintrc: ".jshintrc" //jsonobject in a file
        eqeqeq: true,
        curly:true,
        undef: true,
        //unused: true,
        camelcase: true,
        freeze: true,
        maxdepth: 3
      },
      target:{
         src: "src/*.js"
      }
    },
    concat:{
      options:{
         separator: '\n\n',
         banner: "/* VIANCH GRUNT CONCAT TEST */\n"        
      },
      dist:{
        src: ["src/application.js","src/util.js"],
        dest: "dest/application.js"
      }
    },
    watch:{
      scripts:{
        files:["src/*.js"],
        tasks:['jshint'] 
      }
    },
    clean:{
      target:['dist','dest']
    }
  });


 /**
  * Can call every single task running >grunt nametask:subtask
  * Example: grunt uglify:target
  */
  grunt.loadNpmTasks('grunt-contrib-uglify'); //minify files
  grunt.loadNpmTasks('grunt-contrib-jshint'); //find errors
  grunt.loadNpmTasks('grunt-contrib-concat'); //bind files
  grunt.loadNpmTasks('grunt-contrib-clean');  //clean folders files that don't want
  grunt.loadNpmTasks('grunt-contrib-watch');  //watch changes and run task automatically

 /**
  * Create a rutine default with only the word grunt,
  * the array parameter indiates the task to run and the order
  */
  grunt.registerTask("default",['jshint','concat','uglify']); 

  /*OTHER TASKS*/
  grunt.registerTask("reboot",['clean','default']); 
  
  /*CUSTOM TASK*/
  grunt.registerTask("othertask","This is an example task",function(){
    if( +new Date() % 2 === 0){
      console.log("the time is not evens");
    }
    else
    {
      console.log("task is even");
    }
  });

  grunt.registerTask("taskWithArgs",function(one,two){
    var str = this.name + ": ";
    str += one || "one";
    str += two ? "," + two: ",two";
   
  });


  /*GRUNT API*/

  /*LOGS: Show information console*/
  grunt.registerTask("logs", function(){
    grunt.log.subhead("Allthe logs");
    grunt.log.write("No linebreaks after this...");
    grunt.log.writeln("Linebreaks after this");
    grunt.log.error("This is an error");
    grunt.log.errorlns("This is ls error This is ls error This is ls error This is ls error This is ls error This is ls error ")
    grunt.log.ok("Everythings is ok");
    grunt.log.oklns("Everythings is ok Everythings is ok Everythings is ok Everythings is ok Everythings is ok Everythings is ok Everythings is ok ");
  }); 

  /*Config: Grunts configuration information and modification*/
  grunt.registerTask("config",function(){
    grunt.log.ok(grunt.config.get(["uglify","options","banner"]));
    grunt.config("uglify.options.banner","/*GRUNT CONFIG TEST*/");
    grunt.log.ok(grunt.config.get(["uglify","options","banner"]));
  });

 /**
  * ERRORS:
  * show errors on console, 
  * warnings can be forced to continue with --force
  * fatal: kill any process
  */
  grunt.registerTask("errors",function(){
    grunt.log.subhead("FIRST LINE");
    grunt.fail.warn("THIS IS THE SECOND LINE");
    grunt.log.writeln("THRITH LINE");
    grunt.fail.fatal("THIS IS FOURTH LINE")
    grunt.log.writeln("FIFTH LINE");
  });

  /*Files*/
  grunt.registerTask("files",function(){
     
     grunt.log.subhead("LOADING FILES...");

     grunt.log.writeln("Read file like a string: ");
     var string = grunt.file.read("package.json");
     grunt.log.writeln(string);

     grunt.log.writeln("Read file like a string: ");
     var json = grunt.file.readJSON("package.json");
     grunt.log.writeln(json.devDependencies.grunt);

     grunt.log.writeln("CREATING A FOLDER: ");
     grunt.file.mkdir("junk");
     grunt.log.oklns("FOLDER IS COMPLETE");

     grunt.log.writeln("Write and copy files: ");
     grunt.file.write("junk/sometext.txt","this is a demo write file");
     grunt.file.copy("junk/sometext.txt","junk/othertext.txt");
     grunt.log.oklns("SAVE AND COPY COMPLETE");

     grunt.file.delete("junk/othertext.txt")
     grunt.log.oklns("DELETE COMPLETE");

     grunt.log.writeln("FILES IN FOLDER: ");
     grunt.file.recurse("junk",function(file){
      grunt.log.ok(file);
     });

  });

  /**
   * Options:
   * create options parameter
   * example: --target
   * usage: grunt options --target
   * usage negation: grunt options --no-target
   * usage passing variable: grunt options --target=dev
   */
  grunt.registerTask("options", function(){
    var target = grunt.option("target");
    grunt.log.writeln(target);
  });

  /*Util*/
  grunt.registerTask("utils", function(){

    grunt.log.subhead("UTILS...");

    grunt.log.writeln("Kind of variables like typeof: ");
    grunt.log.writeln(grunt.util.kindOf([1,2,3]));

    var object = {
      name: "VIANCH",
      iObject: {
        one: 1,
        two: 2
      },
      iArray: ["a","b","c"]
    };

    grunt.log.writeln("Recurse show all info into an object: ");
    grunt.util.recurse(object, function(value){
      grunt.log.ok(value);
    });

    grunt.log.writeln("Repeat: ");
    grunt.log.ok(grunt.util.repeat(16, "Na") + " Batman!");

    grunt.log.ok(grunt.util.pluralize(4, "function/functions"));
    grunt.log.ok(grunt.util.pluralize(1, "function/functions"));

    //throw grunt.util.error("error!");


  });




}; //end grunt module