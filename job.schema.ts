
import * as mongoose from "mongoose";
import { UserController } from "src/user/user.controller";
export const JobSchema = new mongoose.Schema({

     status:String,
     job_title: String,
     company:String,
     job_type:String,
     level_of_education:String,
     experience:String,
     location:String,
     vacancies:Number,
     salary:Number,
     deadline:String,

})
