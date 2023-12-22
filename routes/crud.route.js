const express = require("express");

const { crudModel } = require("../model/crud.model");



const crudRoutes = express.Router();



//http://localhost:8080/crud/
crudRoutes.get("/",async(req,res)=>{
    // const data = req.body;
     try {
        const data = await crudModel.find({})
        res.json({success:true, data:data})
     } catch (error) {
        console.log(error.message)
     }

})

//http://localhost:8080/crud/create/
crudRoutes.post("/create",async(req,res)=>{
    const payload = req.body
    try {      
        const data = new crudModel(payload);
        await data.save();
        res.send({success:true,message:"data created Successfully",data:data})
        // res.send({msg:"user created sucesfully",data:data}) 
    } catch (error) {
        console.log(error.message)
    }
      
})
//http://localhost:8080/crud/update
crudRoutes.put("/update",async(req,res)=>{
    const  {_id, ...rest} = req.body;
    try {
       const data =  await crudModel.updateOne({_id:_id},rest);
        res.send({success:true,message:"data updated Successfully",data:data})
    } catch (error) {
        console.log(error.message)
    }
})


//http://localhost:8080/crud/delete/:id
crudRoutes.delete("/delete/:id",async(req,res)=>{
     const id = req.params.id;
    try {
       const data =  await crudModel.deleteOne({_id:id});
        res.send({success:true,message:"data deleted Successfully",data:data})
    } catch (error) {
        console.log(error.message)
    }
})




module.exports={
    crudRoutes
}