const express =require('express')
const router =express.Router()
const multer =require('multer')

let { createusers,login ,uplodfile}=require("../controllers/userContrl")
let { authentication, authorization } =require("../middleware/auth")
//let {} =require("../middleware/upload")
//const upload = require('../middleware/upload')

router.post("/register",multer().any(),createusers)
router.post("/login",multer().any(),login)





module.exports=router;