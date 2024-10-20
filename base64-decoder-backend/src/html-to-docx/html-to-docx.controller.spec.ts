import { Test, TestingModule } from '@nestjs/testing';
import { HtmlToDocxController } from './html-to-docx.controller';

describe('HtmlToDocxController', () => {
  let controller: HtmlToDocxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HtmlToDocxController],
    }).compile();

    controller = module.get<HtmlToDocxController>(HtmlToDocxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
