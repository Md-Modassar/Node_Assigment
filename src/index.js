const express =require('express');
const mongoose =require('mongoose');
const multer = require('multer');
const  route  = require('./routes/routes');
const fileroute =require("./routes/uploadfileroutes")
const app =express()
const path =require('path')
const crypto = require('crypto');
const fs = require('fs');


//const upload = multer({ dest: 'uploads/' });

app.use(express.json())



 


mongoose.connect('mongodb+srv://modassar123:modassar1234@test.ahxnnau.mongodb.net/nodeassig_db', {
    useNewUrlParser: true
}, mongoose.set('strictQuery', false))
    .then(() => console.log("mongoose is connected"))
    .catch(err => console.log(err))

   app.use("/",route)
    app.use("/",fileroute)









    
app.listen(3000,()=>{
    console.log('server running...')
})    
