import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { artisanAuthGuard } from './artisan-auth.guard';

describe('artisanAuthGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => artisanAuthGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
