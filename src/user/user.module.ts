import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from '@nestjs/common/cache/cache.module-definition';
import { ConfigService ,ConfigModule} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtStrategy } from './user.strategy';
@Module({
  imports:[
     PassportModule.register({ defaultStrategy: 'jwt' })
    ,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: process.env.JWT_EXPIRES,
          },
        };
       
      },
    }),
    
  MongooseModule.forFeature([{name:"User",schema:UserSchema}])],
  controllers: [UserController],
  providers: [UserService,JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class UserModule {}
