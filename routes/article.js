const express = require("express");
const router = express.Router();
const {checkLogin} = require("../authware");
const {Article, Category} = require("../model");

router.get("/list", checkLogin, (req, res)=>{
    let user=req.session.user;

    let {keyword,pageNum,pageSize} = req.query;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);//当前页码
    pageSize = 3;//每页的条数
    let query = {author: user._id};
    if(keyword){
        query.title = new RegExp(keyword);
    }

    //populate一个字段表示把一个字段从ID转成对象
    Article.count(query,(err,count)=>{
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('author').exec((err,articles)=>{
            res.render('article/list',{
                title:'我的动态',
                keyword,
                totalPage:Math.ceil(count/pageSize),
                pageNum,
                pageSize,
                articles
            });
        });
    });
});

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
    let _id = req.params.id;
    Article.update({_id}, {$inc: {pv: 1}}, err => {
        if (err) {
            req.flash("error", err);
            req.redirect("back");
        } else {
            Article.findById(_id).populate('category').exec((err, article) => {
                res.render('article/detail', {title: '文章详情', article})
            });
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
    let _id = req.params.id;
    newArticle.author = req.session.user._id;
    Article.update({_id}, newArticle, (err) => {
        if (err) {
            req.flash("error", err);
            res.redirect("back");
        } else {
            req.flash("success", "修改成功");
            res.redirect("/");
        }
    });
});

module.exports = router;