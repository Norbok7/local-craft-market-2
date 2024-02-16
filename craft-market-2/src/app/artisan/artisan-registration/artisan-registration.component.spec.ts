import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanRegistrationComponent } from './artisan-registration.component';

describe('ArtisanRegistrationComponent', () => {
  let component: ArtisanRegistrationComponent;
  let fixture: ComponentFixture<ArtisanRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisanRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtisanRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
