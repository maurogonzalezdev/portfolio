import { Controller, Get } from '@nestjs/common';
import { AppService } from '@api/app/app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }
}
