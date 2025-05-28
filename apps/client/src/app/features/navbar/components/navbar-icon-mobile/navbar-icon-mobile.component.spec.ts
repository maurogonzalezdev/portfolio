import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarIconMobileComponent } from '@client/app/features/navbar/components/navbar-icon-mobile/navbar-icon-mobile.component';

describe('NavbarIconMobileComponent', () => {
  let component: NavbarIconMobileComponent;
  let fixture: ComponentFixture<NavbarIconMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarIconMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarIconMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
