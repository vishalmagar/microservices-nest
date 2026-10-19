import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { of } from 'rxjs';

describe('AppController', () => {
  let app: TestingModule;
  let authClient: { send: jest.Mock };

  beforeAll(async () => {
    authClient = { send: jest.fn() };
    app = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        { provide: 'AUTH_SERVICE', useValue: authClient },
      ],
    }).compile();
  });

  describe('createOrder', () => {
    it('creates an order when the user is verified', async () => {
      authClient.send.mockReturnValue(
        of({ message: 'User verified successfully' }),
      );
      const appController = app.get<AppController>(AppController);

      await expect(appController.createOrder('1')).resolves.toEqual({
        message: 'Order created successfully',
      });
      expect(authClient.send).toHaveBeenCalledWith(
        { cmd: 'verify_user' },
        { userId: 1 },
      );
    });

    it('does not create an order when the user is not verified', async () => {
      authClient.send.mockReturnValue(of({ message: 'Invalid user' }));
      const appController = app.get<AppController>(AppController);

      await expect(appController.createOrder('2')).resolves.toEqual({
        message: 'Order creation failed: Invalid user',
      });
    });
  });
});
