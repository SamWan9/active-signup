const express=require("express");
const app=express();
const user=require("./routes/user");
const category=require("./routes/category");
const article=require("./routes/article");

app.use("/user",user);
app.use("/category",category);
app.use("/article",article);

app.listen(3000,()=>{
    console.log("success!");
});