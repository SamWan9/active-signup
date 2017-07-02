const express = require("express");
const router = express.Router();
const {User} = require("../model");
const {checkLogin, checkNotLogin} = require("../authware");
//如果表单的type=multipart/form-data的话，bodyParser只能处理两种类型 form json，这时要使用另一个中间件multer
const multer=require("multer");
//dest用来指定上传的文件存放的目录，此文件目录是相对于server所在的目录
let upload=multer({dest: "./public"});

router.get("/signup", checkNotLogin, (req, res) => {
    res.render("user/signup", {title: "注册"});
});

router.get("/signin", checkNotLogin, (req, res) => {
    res.render("user/signin", {title: "登录"});
});

router.post("/signin", checkNotLogin, (req, res) => {
    let user = req.body;
    User.findOne(user, (err, doc) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            if (doc) {
                req.flash("success", "登录成功^ ^");
                req.session.user = doc;
                res.redirect("/");
            } else {
                req.flash("error", "登录失败- -!");
                res.redirect("back");
            }
        }
    });
});

router.get("/signout", checkLogin, (req, res) => {
    req.session.user = null;
    res.redirect("/user/signin");
});

router.post("/signup", checkNotLogin, upload.single("avatar"), (req, res) => {
    let user = req.body;
    user.avatar=`/${req.file.filename}`;
    User.findOne({username: user.username},(err,result)=>{
        if(err){
            req.flash("error",err);
            res.redirect("back");
        }else {
            if(result){
                req.flash("error","用户名已被使用- -!");
                res.redirect("back");
            }else {
                User.create(user, (err, doc) => {
                    if (err) {
                        req.flash("error",err);
                        res.redirect("back");
                    } else {
                        req.flash("success","注册成功^ ^");
                        res.redirect("/user/signin");
                    }
                });
            }
        }
    });

});

module.exports = router;