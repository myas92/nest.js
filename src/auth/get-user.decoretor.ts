import { User } from './user.entity';
import { createParamDecorator } from '@nestjs/common';

export const GetUser = createParamDecorator((data, ctx): User => {
    const request = ctx.switchToHttp().getRequest();
    return request.user
})