const express=require("express");
const path=require("path");
const app=express();
const user=require("./routes/user");
const category=require("./routes/category");
const article=require("./routes/article");

app.set("view engine","html");
app.set("views",path.resolve("views"));
app.engine("html",require("ejs").__express);

app.use("/user",user);
app.use("/category",category);
app.use("/article",article);

app.listen(3000,()=>{
    console.log("success!");
});