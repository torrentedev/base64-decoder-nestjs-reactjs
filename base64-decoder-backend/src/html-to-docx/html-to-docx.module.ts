import { Module } from '@nestjs/common';
import { HtmlToDocxController } from './html-to-docx.controller';
import { HtmlToDocxService } from './html-to-docx.service';

@Module({
  controllers: [HtmlToDocxController],
  providers: [HtmlToDocxService]
})
export class HtmlToDocxModule {}
