import { User } from './user.entity';
import { GetUser } from './get-user.decoretor';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Body, Controller, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Decrypt, EncryptResponse} from '../../hashing/encryption';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) { }

    @Post('/signup')
    @UsePipes(ValidationPipe)
    signUp(@Body() authCredentialsDto: AuthCredentialsDto) {
        return this.authService.signUp(authCredentialsDto)
    }

    @Post('/signin')
    @UsePipes(ValidationPipe)
    signIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
        return this.authService.signIn(authCredentialsDto)
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user:User){
        console.log(user);
    }

    @Post('/encrypt')
    encrypt(@Body() body){
        console.log(body);
        console.log("---------------------------------------------------");
        let enData = EncryptResponse(body);
        console.log(enData);
        console.log("**********************");
        let deData = Decrypt(enData.data)
        console.log(deData);
        return enData
        console.log("---------------------------------------------------");
    }
    
}
