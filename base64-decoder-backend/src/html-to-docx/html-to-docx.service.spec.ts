import { Test, TestingModule } from '@nestjs/testing';
import { HtmlToDocxService } from './html-to-docx.service';

describe('HtmlToDocxService', () => {
  let service: HtmlToDocxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HtmlToDocxService],
    }).compile();

    service = module.get<HtmlToDocxService>(HtmlToDocxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
