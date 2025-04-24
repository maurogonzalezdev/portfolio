import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarLinkComponent } from '@client/app/shared/mobile-navbar-link/mobile-navbar-link.component';

describe('MobileNavbarLinkComponent', () => {
  let component: MobileNavbarLinkComponent;
  let fixture: ComponentFixture<MobileNavbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavbarLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
