import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinksMobileComponent } from '@client/app/features/navbar/components/navbar-links-mobile/navbar-links-mobile.component';

describe('NavbarLinksMobileComponent', () => {
  let component: NavbarLinksMobileComponent;
  let fixture: ComponentFixture<NavbarLinksMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinksMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLinksMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
