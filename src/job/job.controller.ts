import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import {CreateJobDto} from "./dto/create-job.dto";
import { JobService } from './job.service';
import { Job } from './interface/job.interface';
// import { AuthGuard } from '@nestjs/passport';

// import { Query as ExpressQuery } from 'express-serve-static-core';
@Controller('job')
export class JobController {

    constructor(private readonly jobservice:JobService){}

    @Get()
    findAll():Promise<Job[]>{
        return this.jobservice.findAll();
    }

    @Get(":id")
    findOne(@Param() Param){
        
        return this.jobservice.findOne(Param.id);
    }

    @Get(":email")
    find_One(@Param() Param){
        return this.jobservice.findOne(Param.email);
    }

    @Post()
    // @UseGuards(AuthGuard())
    create(@Body() createjobdto:CreateJobDto ):Promise<Job>{
        return this.jobservice.create(createjobdto);
    }

    @Delete(":id")
    delete(@Param() Param):Promise<Job>{
        return this.jobservice.delete(Param.id);
    }
    
    @Put(":id")
    update(@Param("id") id , @Body() updatejobdto:CreateJobDto):Promise<Job>{
        return this.jobservice.update(id,updatejobdto);
    }
}
