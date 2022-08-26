const router = require("express").Router();
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

//Model import 
const User = require("../models/User")

//Registering
router.post("/register" , async (req,res) =>{
     
    const newUser = new User ({
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password , process.env.SECRET_KEY).toString(),
    })
    try{
        const user = await newUser.save()
        res.status(201).json(user)
    }catch(err){
        res.status(500).json(err)
    }

})


//Login

router.post("/login" , async (req,res)=>{
    try{


        const user = await User.findOne({email:req.body.email})
        !user && res.status(401).json("Email Id is wrong")

        //decrypting user password 
        const dbPassword = CryptoJS.AES.decrypt(user.password , process.env.SECRET_KEY).toString(CryptoJS.enc.Utf8)

        //verifying the password sent with db password
        dbPassword !== req.body.password && res.status(401).json("Password is wrong")
        
        const accessToken = jwt.sign({id:user._id , isAdmin: user.isAdmin} , process.env.SECRET_KEY ,{expiresIn:"1d"})

        const {password,...info} = user._doc
        res.status(200).json({...info , accessToken})


    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router
