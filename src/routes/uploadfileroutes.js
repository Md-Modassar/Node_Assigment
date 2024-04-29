const express=require('express');
const router=express.Router();
const multer=require('multer')
const { uploadfile, getallfile, deletefile }=require("../controllers/uploadContrl")
const { authentication, authorization } =require("../middleware/auth")
const upload = require('../middleware/upload')


router.get('/files/:userid', getallfile)
router.delete('/files/:userid',authentication,authorization,multer().any(),deletefile)

router.post("/upload/:userid",authentication,authorization,upload.single('file'),uploadfile)

module.exports=router