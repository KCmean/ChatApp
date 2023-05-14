const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{
        type:String,
        min:3,
        max:20,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        max:50,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:8
    },
    isAvatarImageSet :{
        type:Boolean,
        default:false,
    },
    avatarImage: {
        type:String,
        default:"",
    },
})

module.exports = mongoose.model("User",schema)