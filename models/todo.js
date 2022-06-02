const mongoose=require("mongoose");
const todoSchema=new mongoose.Schema({
    discription:{
        type:String,
        required:true
    },
    category:{
                type:String,
                required:true
    },
    date:{
        type:String,
        required:true
    }
})

const ToDo=mongoose.model("TODOList",todoSchema);

module.exports=ToDo;