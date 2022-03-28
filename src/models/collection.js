const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
        trim: true,
        minLength: 3
    },
    email:{
        type: String,
        require: true,
        unique: true,
        validate(value){
            if(!validator.isEmail(value)){
throw new error("Invalid email")
            }
        }
    },
    phone:{
        type: Number,
        require: true,
        unique: true,
        min:10
    },
    message:{
        type: String,
        trim: true,
        minLength: 3
    },
    date:{
        type: Date,
        default: Date.now
    }
})

const user = new mongoose.model('User',userSchema)

module.exports = user;