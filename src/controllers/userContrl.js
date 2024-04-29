const usermodel =require("../models/userModels")
const uploadModel=require("../models/fileuploadModel")
const { default: mongoose } = require("mongoose")
const objectId = mongoose.Types.ObjectId
const jwt=require('jsonwebtoken')
const isValidEmail = function (value) {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/;
    if (emailRegex.test(value)) return true;
  };
  
  
  
  function isValideMobile(value) {
    return (typeof value === "string" && value.trim().length > 0 && value.match(/^[0-9]{10}$/))
  }
  function isValide(value) {
    return (typeof value === "string" && value.trim().length > 0 && value.match(/^[A-Za-z ][A-Za-z _]{1,100}$/));
  }

  exports.createusers=async function(req,res){
    try{
         let data=req.body
         console.log(data)
         if(Object.keys(data).length==0){
            return res.status(400).send({status:false,msg:'files are empty'})
         }

         let {FirstName,LastName,Username,Email,PhoneNo,Password}=data
 
        //--------------------------check mendatory--------------------------------------------//

         if (!FirstName) return res.status(400).send({ status: false, msg: "fname is mendatory" })
         if (!LastName) return res.status(400).send({ status: false, msg: "lname is mendatory" })
         if (!Email) return res.status(400).send({ status: false, msg: "email is mendatory" })
         if(!Username)return res.status(400).send({ status: false, msg: "username is mendatory" })
         if (!PhoneNo) return res.status(400).send({ status: false, msg: "phone is mendatory" })
         if (!Password) return res.status(400).send({ status: false, msg: "password is mendatory" })

       //--------------------------------------check validetion of address----------------------------------------------------------//

       if(!isValide(FirstName)){return res.status(400).send({status:false,msg:"fname is not valid"})}
       if(!isValide(LastName)){return res.status(400).send({status:false,msg:"lname is not valid"})}
       if (!isValidEmail(Email)) return res.status(400).send({ status: false, msg: "email is not valid" })
       if (!isValideMobile(PhoneNo)) return res.status(400).send({ status: false, msg: "phone is not valid" })

       let emailid = await usermodel.findOne({ Email: Email })
       if (emailid) return res.status(400).send({ status: false, msg: "email should be unique" })
       
       const createdata = await usermodel.create(data)

      return res.status(201).send({ status: true, msg: "sucessfull creaction", data: createdata })

    }catch(err){
        return res.status(500).send({status:false,msg:err.message})
    }
  }

  exports.login = async function (req,res){
    try{
      let data =req.body;
      
      if(Object.keys(data).length==0){return res.status(400).send({status:false,message:"PLease enter data"})}
      let {Email,Password}=data

      if (!Email) return res.status(400).send({ status: false, msg: "email is mendatory" })
      if (!Password) return res.status(400).send({ status: false, msg: "password is mendatory" })

      let userEmail = await usermodel.findOne({ Email: Email })
      if (!userEmail) return res.status(404).send({ status: false, msg: "email not found" })

    if (Password != userEmail.Password) return res.status(404).send({ status: false, msg: "password not found" })
   
    let token=jwt.sign({userId:userEmail._id},"dgjjgj")

    return res.status(201).send({status:true,token:token})
    }catch(err){
        return res.status(500).send({status:false,message:err.message})
    }
  }

  