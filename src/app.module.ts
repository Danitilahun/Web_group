import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobModule } from './job/job.module';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017'),JobModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
