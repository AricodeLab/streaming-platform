import { Controller, Get } from '@nestjs/common';
import { StreamingService } from './streaming.service';

@Controller()
export class StreamingController {
  constructor(private readonly streamingService: StreamingService) {}

  @Get()
  getHello(): string {
    return this.streamingService.getHello();
  }
}
