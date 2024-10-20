import { Module } from '@nestjs/common';
import { ImageModule } from './image/image.module';
import { HtmlToDocxModule } from './html-to-docx/html-to-docx.module';

@Module({
  imports: [ImageModule, HtmlToDocxModule],
})
export class AppModule {}
