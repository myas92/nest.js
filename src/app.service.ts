import { Injectable } from '@nestjs/common';


@Injectable()
export class AppService {
  getHello(): string {
    console.log("hiiiiiiiiiiiiiasdasdi");
    return 'Hello World!sfghfdsad';
  }
}
