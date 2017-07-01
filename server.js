const express=require("express");
const app=express();
const user=require("./routes/user");

app.use("/user",user);



app.listen(3000,()=>{
    console.log("success!");
});