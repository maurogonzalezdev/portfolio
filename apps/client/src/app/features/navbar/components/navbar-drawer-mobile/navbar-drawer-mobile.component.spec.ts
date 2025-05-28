import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarDrawerMobileComponent } from '@client/app/features/navbar/components/navbar-drawer-mobile/navbar-drawer-mobile.component';

describe('NavbarDrawerMobileComponent', () => {
  let component: NavbarDrawerMobileComponent;
  let fixture: ComponentFixture<NavbarDrawerMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarDrawerMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarDrawerMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
