const express=require("express");
const path=require("path");
const bodyParser=require("body-parser");
const session=require("express-session");
const MongoStore=require("connect-mongo")(session);
const user=require("./routes/user");
const category=require("./routes/category");
const article=require("./routes/article");
const index=require("./routes/index");
const flash=require("connect-flash");

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "sam",
    store: new MongoStore({url: "mongodb://127.0.0.1/myBlog"})
}));

app.use(flash());

app.use((req,res,next)=>{
    res.locals.user=req.session.user;
    res.locals.success=req.flash("success").toString();
    res.locals.error=req.flash("error").toString();
    res.locals.keyword="";
    next();
});

app.set("view engine","html");
app.set("views",path.resolve("views"));
app.engine("html",require("ejs").__express);

app.use(express.static("node_modules"));
app.use(express.static("public"));

app.use("/",index);
app.use("/user",user);
app.use("/category",category);
app.use("/article",article);

app.listen(3000,()=>{
    console.log("success!");
});