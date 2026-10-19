import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {MessagePattern, Payload} from "@nestjs/microservices";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({cmd: 'verify_user'})
  verifyUser(@Payload() data: any) {
    return this.appService.verifyUser(data);
  }
  @Get()
  getData() {
    return this.appService.getData();
  }
}
