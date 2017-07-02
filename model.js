const mongoose=require("mongoose");

let con=mongoose.createConnection("mongodb://127.0.0.1/myBlog");
let ObjectId=mongoose.Schema.Types.ObjectId;

exports.User=con.model("User",new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
}));

exports.Category=con.model("Category",new mongoose.Schema({
    name: String
}));

exports.Article=con.model("Article",new mongoose.Schema({
    title: String,
    content: String,
    category: {type: ObjectId, ref: "Category"},
    author: {type: ObjectId, ref: "User"},  //外键：其它集合的主键
    createAt: {type: Date, default: Date.now}
}));