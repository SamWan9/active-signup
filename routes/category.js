const express=require("express");
const router=express.Router();

router.get("/list",(req,res)=>{
    res.send("分类列表");
});

router.get("/add",(req,res)=>{
    res.send("添加分类");
});

router.get("/delete/:id",(req,res)=>{
    res.send("删除分类");
});

module.exports=router;