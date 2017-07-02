const express=require("express");
const router=express.Router();
const {checkLogin}=require("../authware");

router.get("/list",checkLogin,(req,res)=>{
    res.render("category/list",{title: "列表"});
});

router.get("/add",checkLogin,(req,res)=>{
    res.render("user/signup",{title: "新增列表"});
});

router.get("/delete/:id",checkLogin,(req,res)=>{
    res.render("user/signup",{title: "删除列表"});
});

module.exports=router;