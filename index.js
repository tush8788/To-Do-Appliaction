//importing require librory
const express=require("express");
const bodyParser=require("body-parser");
const path =require("path");
const port =8000;

const app=express();


app.set("view engine","ejs")    //set view engine as a ejs 
app.set("views",path.join(__dirname,"views"));  //set views folder path

//use middleware 
app.use(bodyParser.urlencoded());  //convert encoded data into object
app.use(express.static("assets"));  //setup static folder 

//updating Date
function dateFinder(req)
{
    var date=req.body.date;
    var month=date.slice(5,7);
    var year=date.slice(0,4);
    var mainDate=date.slice(8); 

    switch(month)
    {
        case '01':
            month="Jan";
            break;
        case '02':
            month="Feb";
            break;
        case '03':
            month="Mar";
            break;
        case '04':
            month="Apr";
            break;
        case '05':
            month="Mey";
            break;
        case '06':
            month="June";
            break;
        case '07':
            month="July";
            break;
        case '08':
            month="Aug";
            break;
        case '09':
            month="Sep";
            break;
        case '10':
            month="Oct";
            break;
        case '11':
            month="Nov";
            break;
        case '12':
            month="Dec";
            break;
    }
    month=month+" "+mainDate+" "+year;
    req.body.date="";
    req.body.date=month;
    
}

//database connection files
const db=require('./config/mongoose');
const Todo=require('./models/todo');

//handle url requests
//handle home url 
app.get("/",function(req,res){

    Todo.find({},function(err,todolist){
        if(err)
        {
            console.log("error in fetching Todo list form contact ",err);
            return;
        }
        
        return res.render("home",{
            title:"TODO App",
            todo_list:todolist
        });
    })

    
})

//insert data into database
app.post("/create-todo",function(req,res){
    dateFinder(req);   //month converter
    
    Todo.create({
        discription:req.body.discription,
        category:req.body.category,
        date:req.body.date
    },function(err,newTodo){
        if(err)
        {
            console.log("error in data insertion into database ",err);
            return;
        }
        console.log("******",newTodo);
        return res.redirect("back");
    })
    
})

//delete document
app.get("/delete-todo",function(req,res){
    Todo.findByIdAndDelete(req.query.id,function(err){
        if(err)
        {
            console.log("error in deleting conatct ",err);
            return;
        }
        
        return res.redirect("back");
    })
})

//listen port server is run or not
app.listen(port,(err)=>{
    if(err)
    {
        console.log(`error in run server ${port}`);
        return;
    }
    console.log(`Server is up on ${port} port`);
    return;
})