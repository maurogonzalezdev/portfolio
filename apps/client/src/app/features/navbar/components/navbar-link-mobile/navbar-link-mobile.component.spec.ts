import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinkMobileComponent } from '@client/app/features/navbar/components/navbar-link-mobile/navbar-link-mobile.component';

describe('NavbarLinkMobileComponent', () => {
  let component: NavbarLinkMobileComponent;
  let fixture: ComponentFixture<NavbarLinkMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinkMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLinkMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
