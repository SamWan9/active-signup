const express=require("express");
const router=express.Router();

router.get("/add",(req,res)=>{
    res.send("增加文章");
});

router.get("/delete/:id",(req,res)=>{
    res.send("删除文章");
});

module.exports=router;