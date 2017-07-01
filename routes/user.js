const express = require("express");
const router = express.Router();

router.get("/signup",(req,res)=>{
    res.send("用户注册");
});

router.get("/signin",(req,res)=>{
    res.send("用户登录");
});

router.get("/signout",(req,res)=>{
    res.send("用户退出");
});

module.exports = router;