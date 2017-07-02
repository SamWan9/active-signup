exports.checkLogin=(req,res,next)=>{
    if(req.session.user){
        next();
    }else {
        res.redirect("/user/signin");
    }
};

exports.checkNotLogin=(req,res,next)=>{
    if(req.session.user){
        res.redirect("/");
    }else {
        next();
    }
};