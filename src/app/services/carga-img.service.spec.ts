import { TestBed } from '@angular/core/testing';

import { CargaImgService } from './carga-img.service';

describe('CargaImgService', () => {
  let service: CargaImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
