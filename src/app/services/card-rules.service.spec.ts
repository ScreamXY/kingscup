import { TestBed } from '@angular/core/testing';

import { CardRulesService } from './card-rules.service';

describe('CardRulesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CardRulesService = TestBed.get(CardRulesService);
    expect(service).toBeTruthy();
  });
});
