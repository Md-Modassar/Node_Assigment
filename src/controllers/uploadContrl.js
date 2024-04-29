const fileModel =require("../models/fileuploadModel")
const path=require('path')
const fs =require('fs')
exports.uploadfile=async(req,res)=>{
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
}

try {
  const userid=req.params.userid
    const newFile= {
        userid:userid,
        filename: req.file.originalname,
        path: req.file.path,
        size: req.file.size,
        contentType: req.file.mimetype
    };
    await fileModel.create(newFile);
    res.status(200).json({ message: 'File uploaded successfully', file: newFile });
} catch (err) {
   
    return res.status(500).json({ message: 'Failed to save file to MongoDB' });
}
}

exports.getallfile=async(req,res)=>{
  const userid=req.params.userid

  const getfiles=await fileModel.find({userid:userid}).select('filename')
   console.log(getfiles[0].filename)
    const directoryPath = path.join(__dirname, '../uploads/images');
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
          return res.status(500).json({ message: 'Error listing files', error: err.message });
      }
      const filteredFiles = [];
      files.forEach(file => {
          
          const matchFound = getfiles.some(term => term.filename === file);
       
          if (matchFound) {
              filteredFiles.push(file);
          }
      });
      res.status(200).json({ files: filteredFiles });
  });
};

exports.deletefile=async(req,res)=>{
  try{
    const {userid}=req.params
    const filename=req.body.filename
    console.log(userid,filename)
    const fileToDelete = await fileModel.findOneAndDelete({ userid:userid , filename: filename });

    if (!fileToDelete) {
        return res.status(404).json({ message: 'File not found' });
    }
     
    

  
  
    const filePath = path.join(__dirname, '../uploads/images', filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting file', error: err.message });
        }
        res.status(200).json({ message: 'File deleted successfully', filename: filename });
    });
  }catch(err){
    return res.status(500).send({status:false,message:err.message})
  }
}

