import { Injectable, Logger } from '@nestjs/common';
import * as htmlToDocx from 'html-to-docx';
import * as sharp from 'sharp';
import { writeFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class HtmlToDocxService {
  private readonly logger = new Logger(HtmlToDocxService.name);

  async convertHtmlToDocx(html: string, options: { resize: boolean, resizeValue: number, compress: boolean, convertToJpg: boolean }): Promise<string> {
    try {
      const cleanedHtml = this.cleanHtml(html);
      const updatedHtml = await this.processBase64Images(cleanedHtml, options);
      const docxBuffer = await htmlToDocx(updatedHtml);
      const filePath = join(__dirname, '../../docs', 'converted.docx');
      writeFileSync(filePath, docxBuffer);
      return filePath;
    } catch (error) {
      this.logger.error('Error converting HTML to DOCX', error);
      throw new Error('Error converting HTML to DOCX');
    }
  }

  cleanHtml(html: string): string {
    // Reemplazar las comillas escapadas con comillas normales
    const cleanedHtml = html.replace(/\\"/g, '"');
    this.logger.log('HTML cleaned');
    return cleanedHtml;
  }

  async processBase64Images(html: string, options: { resize: boolean, resizeValue: number, compress: boolean, convertToJpg: boolean }): Promise<string> {
    const base64ImageRegex = /<img\s+src=["']data:image\/(png|jpeg|jpg);base64,([^"']+)["']/gi;
    let match;
    let updatedHtml = html;
    const matches = [];

    while ((match = base64ImageRegex.exec(html)) !== null) {
      matches.push(match);
    }

    this.logger.log(`Found ${matches.length} base64 images`);

    for (const match of matches) {
      try {
        const [fullMatch, format, base64] = match;
        const processedImage = await this.processImage(format, base64, options);
        updatedHtml = updatedHtml.replace(fullMatch, `<img src="${processedImage}"`);
      } catch (error) {
        this.logger.error('Error processing image', error);
      }
    }

    return updatedHtml;
  }

  async processImage(format: string, base64: string, options: { resize: boolean, resizeValue: number, compress: boolean, convertToJpg: boolean }): Promise<string> {
    try {
      if (!base64) {
        throw new Error('Base64 string is undefined');
      }

      let buffer = Buffer.from(base64, 'base64');
      let image = sharp(buffer);

      if (options.resize) {
        const percentage = options.resizeValue / 100;
        const metadata = await image.metadata();
        image = image.resize({
          width: Math.round(metadata.width * percentage),
          height: Math.round(metadata.height * percentage)
        });
      }

      if (options.compress) {
        image = image.jpeg({ quality: 50 });
      }

      if (options.convertToJpg) {
        image = image.toFormat('jpeg');
        format = 'jpeg';
      }

      const outputBuffer = await image.toBuffer();
      const updatedBase64 = outputBuffer.toString('base64');
      return `data:image/${format};base64,${updatedBase64}`;
    } catch (error) {
      this.logger.error('Error processing image', error);
      throw new Error('Error processing image');
    }
  }
}
