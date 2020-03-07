import { Controller, Get, Patch, Post, Put } from '@nestjs/common';

@Controller('/v2/coctail')
export class CoctailController {
  @Get('myCoctails')
  async getCoctails() {
    return {};
  }

  @Post('postHere')
  async PostHere() {
    return 'Post!';
  }

  @Put('puthere')
  async PutHere() {
    return 'Put!';
  }

  @Patch('patcHere')
  async PatchHere() {
    return 'Patch';
  }
}
