import { Controller, Get, Inject, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class AppController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    private readonly appService: AppService,
  ) {}

  @Get(':id')
  async createOrder(@Param('id') userId: string) {
    const pattern = { cmd: 'verify_user' };
    const payload = { userId: Number(userId) };
    const response = await firstValueFrom(this.authClient.send(pattern, payload));
    if (response.message === 'User verified successfully') {
      return this.appService.getData();
    } else {
      return { message: 'Order creation failed: Invalid user' };
    }
  }
}
