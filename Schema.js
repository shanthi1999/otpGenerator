const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    email:{
        type:String
    },
    code:{
        type:Number
    }
})

module.exports = mongoose.model('user',userSchema);