const express = require("express");
const router = express.Router();
const {checkLogin} = require("../authware");
const {Article, Category} = require("../model");

router.get("/add", checkLogin, (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            res.render("article/add", {title: "增加文章", categories});
        }
    });
});

router.post("/add", checkLogin, (req, res) => {
    let article = req.body;
    article.author = req.session.user._id;
    Article.create(article, (err) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            res.redirect("/");
        }
    });
});

router.get("/detail/:id", (req, res) => {
    let id = req.params.id;
    Article.findById(id).populate("category").exec((err, doc) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            res.render("article/detail", {title: "文章内容", article: doc});
        }
    });
});

router.get("/delete/:id", checkLogin, (req, res) => {
    let _id = req.params.id;
    Article.remove({_id}, (err) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            req.flash("success", "删除文章成功^ ^");
            res.redirect("/");
        }
    });
});

router.get("/update/:id", checkLogin, (req, res) => {
    let _id = req.params.id;
    Article.findById(_id, (err, doc) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            Category.find({}, (err, categories) => {
                if (err) {
                    req.flash("error", err);
                    res.redirect("back");
                } else {
                    res.render("article/update", {title: "修改文章", article: doc, categories});
                }
            });
        }
    });
});

router.post("/update/:id", checkLogin, (req, res) => {
    let newArticle = req.body;
    let _id=req.params.id;
    newArticle.author=req.session.user._id;
    Article.update({_id},newArticle,(err)=>{
        if(err){
            req.flash("error", err);
            res.redirect("back");
        }else {
            req.flash("success","修改成功");
            res.redirect("/");
        }
    });
});

module.exports = router;