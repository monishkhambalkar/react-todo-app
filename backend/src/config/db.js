const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://monishkhambalkar_db_user:V8i80yZUC2jq1Nyl@cluster0.lar1lau.mongodb.net/");
        console.log("mongodb connected");
    }catch(err){
        console.error(err.message)
        process.exit(1);
    }
};