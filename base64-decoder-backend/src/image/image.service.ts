import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  async decodeBase64Image(base64string: string, options: { resize: boolean, resizeValue: number, compress: boolean, convertToJpg: boolean }): Promise<{ buffer: Buffer, details: any }> {
    let buffer = Buffer.from(base64string, 'base64');
    let image = sharp(buffer);
    const details = {};

    const metadata = await image.metadata();
    details['Tamaño inicial'] = `${metadata.size} bytes`;

    if (options.resize) {
      const percentage = options.resizeValue / 100;
      image = image.resize({
        width: Math.round(metadata.width * percentage),
        height: Math.round(metadata.height * percentage)
      });
      details['Redimensionar'] = `${options.resizeValue}%`;
    }

    if (options.compress) {
      image = image.jpeg({ quality: 50 });
      details['Comprimir'] = 'Sí';
    }

    if (options.convertToJpg) {
      image = image.toFormat('jpeg');
      details['Convertir a JPG'] = 'Sí';
    }

    const outputBuffer = await image.toBuffer();
    details['Tamaño final'] = `${outputBuffer.length} bytes`;

    return { buffer: outputBuffer, details };
  }
}
