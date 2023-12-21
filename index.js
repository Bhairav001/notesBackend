const express = require("express");

const cors = require("cors");
const { connection } = require("./config/db");
const { crudRoutes } = require("./routes/crud.route");
const { userRouter } = require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { postRouter } = require("./routes/post.route");

require("dotenv").config()

const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors());

const PORT = process.env.PORT || 8080;

app.get("/",(req,res)=>{
    // res.send("This is Crud Application")
    res.json({msg:"Server is running on port 8080"})
})
app.use("/users",userRouter)
// app.use(authenticate)
app.use("/crud",crudRoutes)
app.use("/posts",postRouter)
app.listen(PORT,async()=>{
    try {
        await connection
        console.log({msg:"connected to DB"})
    } catch (error) {
        console.log(error.message)
    }
    console.log({msg:`Server is running on in the port ${PORT}`})
})


