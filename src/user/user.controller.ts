import { Controller ,Post , Body, Get ,Delete ,Param} from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signin.dto';
import { CreateUserDto } from './dto/user.dto';
import { User } from './interface/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor( private readonly userService:UserService){}

@Post('/signup')
   signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
    return this.userService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.userService.login(loginDto);
  }

  @Get()
    getall(){
        return this.userService.getall();
    }

    @Post()
    create(@Body() createjobdto:CreateUserDto ):Promise<Object>{
       return this.userService.create(createjobdto);
    }

    @Delete(":id")
    delete(@Param() Param):Promise<User>{
        return this.userService.delete(Param.id);
    }
}
