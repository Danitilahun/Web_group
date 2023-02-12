import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { UserModule } from 'src/user/user.module';
import { JobService } from './job.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JobSchema } from './schemas/job.schema';
@Module({
  imports:[
    UserModule,
    MongooseModule.forFeature([{name:"Job",schema:JobSchema}])],
  controllers: [JobController],
  providers: [JobService]
})
export class JobModule {}
