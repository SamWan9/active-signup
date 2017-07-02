const express=require("express");
const router=express.Router();
const {checkLogin}=require("../authware");

router.get("/add",checkLogin,(req,res)=>{
    res.render("user/signup",{title: "增加文章"});
});

router.get("/delete/:id",checkLogin,(req,res)=>{
    res.render("user/signup",{title: "删除文章"});
});

module.exports=router;