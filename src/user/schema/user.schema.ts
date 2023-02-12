
import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    firstname: {
        required: true,
        type: String,
    },
    lastname: {
        required: true,
        type: String,
    },
    phonenumber:{
        required: true,
        unique: true,
        type: String,
    },
    password:{
        required: true,
        type: String,
    },
    email:{
        required: true,
        unique: true,
        type: String,
    },
    securityquestion: {
        question : String,
        answer : String 
    },
    status:String,
    country:String,
    city:String,
    date:String,
})

