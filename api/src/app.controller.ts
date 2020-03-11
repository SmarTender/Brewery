import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import ApiResponse from './common/apiResponse.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse {
    return new ApiResponse(true, 'Hello World!');
  }
}
