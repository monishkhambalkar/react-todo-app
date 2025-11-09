const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    folderId : {type : mongoose.Schema.Types.ObjectId, ref:"Folder", required : true},
    text : {type : String, required : true},
    isDone : {type : Boolean, default : 0},
    process : {type : Number, default :0},
    date : {type : Date, default : Date.now}
})

module.exports  = mongoose.model("Task", TaskSchema)