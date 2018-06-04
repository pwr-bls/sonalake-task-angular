import { TestBed, inject } from '@angular/core/testing';

import { Character.Services.TsService } from './character.services.ts.service';

describe('Character.Services.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Character.Services.TsService]
    });
  });

  it('should be created', inject([Character.Services.TsService], (service: Character.Services.TsService) => {
    expect(service).toBeTruthy();
  }));
});
