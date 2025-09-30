
const mongoose = require("mongoose");

const connectDB = async () =>{
    await mongoose.connect("mongodb+srv://kushalbhakhandwal_db_user:hz6IiRPbr8xyTm14@cluster0.0e6fgiv.mongodb.net/devTInder")
    
}


module.exports = connectDB;

