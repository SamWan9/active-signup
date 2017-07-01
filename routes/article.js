const express=require("express");
const router=express.Router();

router.get("/add",(req,res)=>{
    res.render("user/signup",{title: "注册",content: "用户注册"});
});

router.get("/delete/:id",(req,res)=>{
    res.render("user/signup",{title: "注册",content: "用户注册"});
});

module.exports=router;