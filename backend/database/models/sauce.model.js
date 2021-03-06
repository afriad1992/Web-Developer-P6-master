const mongoose = require("mongoose");
const schema = mongoose.Schema;



 const sauce=schema({
    userId :{type:String},
    name:{type:String} ,
    manufacturer : {type:String} ,
    description : {type:String},
    mainPepper : {type:String},
    imageUrl : {type:String},
    heat :{type:Number} ,
    likes : {type:Number},
    dislikes : {type:Number},
    usersLiked : [String ],
    usersDisliked : [ String ]

 });
 
module.exports= mongoose.model("sauce", sauce);