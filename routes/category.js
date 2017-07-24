const express=require("express");
const router=express.Router();
const {checkLogin}=require("../authware");
const {Category}=require("../model");

router.get("/list",checkLogin,(req,res)=>{
    Category.find({},(err,result)=>{
        res.render("category/list",{title: "分类列表",categories: result});
    });
});

router.get("/add",checkLogin,(req,res)=>{
    res.render("category/add",{title: "新增列表"});
});

router.get("/introduce",(req,res)=>{
    Category.find({},(err,result)=>{
        res.render("category/introduce",{title: "活动简介",categories:result});
    });
});

router.post("/add",checkLogin,(req,res)=>{
    let category=req.body;
    Category.findOne(category,(err,result)=>{
        if(err){
            req.flash("error",err);
            res.redirect("back");
        }else {
            if(result){
                req.flash("error","分类名称已存在- -!");
                res.redirect("back");
            }else {
                Category.create(category,(err)=>{
                    if(err){
                        req.flash("error",err);
                    }else {
                        req.flash("success","新增分类成功^ ^");
                        res.redirect("/category/list");
                    }
                });
            }
        }
    });
});

router.get("/delete/:id",checkLogin,(req,res)=>{
    let _id=req.params.id;
    Category.findOne({_id},(err,result)=>{
        if(err){
            req.flash("error",err);
            res.redirect("back");
        }else {
            Category.remove({_id},(err)=>{
                if(err){
                    req.flash("error",err);
                    res.redirect("back");
                }else {
                    req.flash("success",`删除${result.name}成功^ ^`);
                    res.redirect("/category/list");
                }
            });
        }
    });

});

module.exports=router;