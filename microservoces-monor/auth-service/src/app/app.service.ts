import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): { message: string } {
    return { message: 'Hello API' };
  }
  verifyUser(data: any): { message: string } {
    const { userId } = data;
    if (userId === 1) {
      return { message: 'User verified successfully' };
    } else {
      return { message: 'Invalid user' };
    }
  }
}
