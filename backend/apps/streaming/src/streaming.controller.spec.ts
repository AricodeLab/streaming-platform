import { Test, TestingModule } from '@nestjs/testing';
import { StreamingController } from './streaming.controller';
import { StreamingService } from './streaming.service';

describe('StreamingController', () => {
  let streamingController: StreamingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [StreamingController],
      providers: [StreamingService],
    }).compile();

    streamingController = app.get<StreamingController>(StreamingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(streamingController.getHello()).toBe('Hello World!');
    });
  });
});
