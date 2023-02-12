import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './interface/job.interface';
import { Model } from 'mongoose';



@Injectable()
export class JobService {
    constructor(@InjectModel("Job") private readonly jobModel : Model<Job>){}

    async findAll():Promise<Job[]>{
        return await this.jobModel.find();
    }

    async findOne(id:string):Promise<Job>{
        return await this.jobModel.findOne({_id:id});
    }
    async find_One(ema_il:string):Promise<Job>{
        return await this.jobModel.findOne({email:ema_il});
    }

    async create(job:Job):Promise<Job>{
        const new_job= new this.jobModel(job);
        return await new_job.save();
    }
    async delete(id:string):Promise<Job>{
        return await this.jobModel.findByIdAndDelete({_id:id})
    }
    async update(id:string, job:Job):Promise<Job>{
        return await this.jobModel.findByIdAndUpdate(id,job,{new:true})
    }
}
