const express = require("express");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken")

const { userModel } = require("../model/user.model");


const userRouter = express.Router();



userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body;
     try {
        bcrypt.hash(password,6,async(err,secure_pass)=>{
            if(err){
                console.log(err)
            }else{
                const user = new userModel({name,email,gender,password:secure_pass,age,city})
                await user.save();
                res.send({msg:"User Registered"})
            }
        })
     } catch (error) {
        console.log({msg:"Something went wrong","error":error.message})
     }
})



userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await userModel.find({email});
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({userID:user[0]._id},"masai");
                    res.send({msg:"Login Successfully done!","token":token})
                }else{
                    res.send({msg:"Wrong Credintials about token"})
                }
            })
        }else{
             res.send({msg:"Wrong Credintials"})
        }
    } catch (error) {
        console.log({msg:"something went wrong","error":error.message})
    }
})




module.exports={
    userRouter
}