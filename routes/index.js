const express = require("express");
const router = express.Router();
const {Article} = require("../model");

router.get("/", (req, res) => {

    let {keyword,pageNum,pageSize} = req.query;
    pageNum = isNaN(pageNum)?1:parseInt(pageNum);//当前页码
    pageSize = 3;//每页的条数
    let query = {};
    if(keyword){
        query.title = new RegExp(keyword);
    }

    //populate一个字段表示把一个字段从ID转成对象
    Article.count(query,(err,count)=>{
        Article.find(query).sort({createAt:-1}).skip((pageNum-1)*pageSize).limit(pageSize).populate('author').exec((err,articles)=>{
            res.render('index',{
                title:'首页',
                keyword,
                totalPage:Math.ceil(count/pageSize),
                pageNum,
                pageSize,
                articles
            });
        });
    });
});

module.exports = router;