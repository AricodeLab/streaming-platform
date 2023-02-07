import { Injectable } from '@nestjs/common';

@Injectable()
export class StreamingService {
  getHello(): string {
    return 'Hello World!';
  }
}
