const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/ToDoList");

const db=mongoose.connection;

db.on("error",function(){
    console.log("error in connection to database");
})

db.once("open",function(){
    console.log("successfuly connected with database");
})


