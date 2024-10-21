import { Controller, Post, Body, Res, Logger } from '@nestjs/common';
import { HtmlToDocxService } from './html-to-docx.service';
import { Response } from 'express';

@Controller('html-to-docx')
export class HtmlToDocxController {
  private readonly logger = new Logger(HtmlToDocxController.name);

  constructor(private readonly htmlToDocxService: HtmlToDocxService) {}

  @Post('convert')
  async convertHtml(
    @Body('html') html: string,
    @Body('resize') resize: boolean,
    @Body('resizeValue') resizeValue: number,
    @Body('compress') compress: boolean,
    @Body('convertToJpg') convertToJpg: boolean,
    @Res() res: Response
  ): Promise<void> {
    try {
      const filePath = await this.htmlToDocxService.convertHtmlToDocx(html, { resize, resizeValue, compress, convertToJpg });
      res.download(filePath);
    } catch (error) {
      this.logger.error('Error in HTML to DOCX conversion', error);
      res.status(500).send('Error converting HTML to DOCX');
    }
  }

  @Post('clean-aspect-ratio')
  async cleanAspectRatio(@Body('html') html: string, @Res() res: Response): Promise<void> {
    try {
      const { cleanedHtml, count } = this.htmlToDocxService.cleanAspectRatios(html);
      res.json({ cleanedHtml, count });
    } catch (error) {
      this.logger.error('Error cleaning aspect-ratio', error);
      res.status(500).send('Error cleaning aspect-ratio');
    }
  }

}
