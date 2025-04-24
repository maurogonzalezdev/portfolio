import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarLinksComponent } from '@client/app/shared/mobile-navbar-links/mobile-navbar-links.component';

describe('MobileNavbarLinksComponent', () => {
  let component: MobileNavbarLinksComponent;
  let fixture: ComponentFixture<MobileNavbarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavbarLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
