const express = require("express");
const router = express.Router();
const {Article} = require("../model");

router.get("/", (req, res) => {
    //populate一个字段表示把一个字段从ID转成对象
    Article.find({}).populate("author").exec((err, articles) => {
        if(err){
            req.flash("error",err);
        }else {
            res.render("index", {title: "首页", articles});
        }
    });
});

module.exports = router;