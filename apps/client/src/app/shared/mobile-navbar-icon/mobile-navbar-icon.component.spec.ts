import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarIconComponent } from '@client/app/shared/mobile-navbar-icon/mobile-navbar-icon.component';

describe('MobileNavbarIconComponent', () => {
  let component: MobileNavbarIconComponent;
  let fixture: ComponentFixture<MobileNavbarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavbarIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
