import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanLoginComponent } from './artisan-login.component';

describe('ArtisanLoginComponent', () => {
  let component: ArtisanLoginComponent;
  let fixture: ComponentFixture<ArtisanLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArtisanLoginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArtisanLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
