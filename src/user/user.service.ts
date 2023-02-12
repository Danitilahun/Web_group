import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignUpDto } from './dto/signin.dto';
import { User } from './interface/user.interface';

import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';



@Injectable()
export class UserService {
    constructor( @InjectModel("User") private userModel : Model<User> ,private jwtService: JwtService){
    }

    async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
        const { firstname, lastname, city , country , phonenumber ,email, password } = signUpDto;
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const user = await this.userModel.create({
          firstname,
          lastname,
          city,
          country,
          phonenumber,
          email,
          password: hashedPassword,
        });
    
        const token = this.jwtService.sign({ id: user._id });
        return { token };
      }

      async login(loginDto: LoginDto): Promise<{ token: string }> {
        const { email, password } = loginDto;
    
        const user = await this.userModel.findOne({ email });
    
        if (!user) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const isPasswordMatched = await bcrypt.compare(password, user.password);
    
        if (!isPasswordMatched) {
          throw new UnauthorizedException('Invalid email or password');
        }
    
        const token = this.jwtService.sign({ id: user._id });
        
        return { token };
      }
      
    async getall(){
        return await this.userModel.find({} , {"_id" : 0 , "__v" : 0 ,"password":0 ,"securityquestion":0 });
    }

    async create(userObject: User) {
        const new_user= new this.userModel(userObject)
        const temp= await this.userModel.findOne({email:userObject.email});
        if(!temp){
            await new_user.save();
            return new_user;
        }
        else{
            return new Error("Someone already registered with this email!!!")
        }
   
    }

    async delete(id:string):Promise<User>{
        return await this.userModel.findByIdAndDelete({_id:id})
    }
    
}
