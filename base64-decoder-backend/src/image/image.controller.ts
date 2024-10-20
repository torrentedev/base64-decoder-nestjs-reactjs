import { Controller, Post, Body } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('decode')
  async decodeImage(
    @Body('base64') base64: string,
    @Body('resize') resize: boolean,
    @Body('resizeValue') resizeValue: number,
    @Body('compress') compress: boolean,
    @Body('convertToJpg') convertToJpg: boolean
  ): Promise<{ message: string, image: string, details: any }> {
    const { buffer, details } = await this.imageService.decodeBase64Image(base64, { resize, resizeValue, compress, convertToJpg });
    const imageBase64 = buffer.toString('base64');
    return { message: 'Imagen decodificada exitosamente', image: imageBase64, details };
  }
}
