const mongoose = require('mongoose');
const objectId = mongoose.Schema.Types.ObjectId
const fileSchema = new mongoose.Schema({
  userid:{type:objectId,required:true},
  filename: String,
  path: String,
  size: Number,
  contentType: String,
  uploadedAt: { type: Date, default: Date.now }
});
module.exports=mongoose.model("upload",fileSchema)