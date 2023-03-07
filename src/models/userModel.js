const mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
      name:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
            unique:true
      },
      password:{
            type:String,
            required:true
      },
      role:{
            type:String,
            default:'Student'
      }
},{timestamps:true})

module.exports = mongoose.model('user',userSchema)