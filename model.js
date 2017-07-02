const mongoose=require("mongoose");

let con=mongoose.createConnection("mongodb://127.0.0.1/myBlog");

exports.User=con.model("User",new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    avatar: String
}));