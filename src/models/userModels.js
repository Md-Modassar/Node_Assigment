const mongoose=require("mongoose")

const userSchema= new mongoose.Schema({
    FirstName: { type: String,required:true },
    LastName: { type: String, required: true },
    Username: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNo: { type: String, required: true },
    Password: { type: String, required: true }

},{timestamps:true})

module.exports = mongoose.model("users",userSchema)