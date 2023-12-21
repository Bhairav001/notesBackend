const mongoose = require("mongoose");

const crudSchema = mongoose.Schema({
    name:String,
    email:String,
    mobile:String
},{
    timestamps:true
})

const crudModel = mongoose.model("crud",crudSchema);


module.exports={
    crudModel
}