const jwt =require("jsonwebtoken")
const userModel =require("../models/userModels");
const mongoose = require('mongoose')
const objectId = mongoose.Types.ObjectId

exports.authentication =(req,res,next)=>{
  try{
   
    let token = req.headers.authorization

    if(!token) return res.status(400).send({status:false,message:"Token is mandatory"})
    token =token.split(" ")
  
    jwt.verify(token[1],"dgjjgj",(error,decoded)=>{
        if(error) return res.status(401).send({status:false ,mesage:error.message})
        req.id=decoded.userId
        next()
    })
  }catch(err){
    return res.status(500).send({status:false,message:err.message})
  }
}

exports.authorization=async(req,res,next)=>{
    let userid = req.params.userid
    if (!objectId.isValid(userid)) { return res.status(400).send({ status: false, msg: "please enter valide userid" }) }
    const userexit = await userModel.findById(userid)
    if (!userexit) { return res.status(404).send({ status: false, msg: "userid not found" }) }
    console.log(req.id,userid)
    if (userid !== req.id) { return res.status(403).send({ status: false, msg: "unautherized user" }) }

    next()
}

