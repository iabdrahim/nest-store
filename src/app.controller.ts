import { Module, Get, Controller } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  sayHi() {
    return 'Yo !';
  }
}
