import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinkDesktopComponent } from '@client/app/features/navbar/components/navbar-link-desktop/navbar-link-desktop.component';

describe('NavbarLinkDesktopComponent', () => {
  let component: NavbarLinkDesktopComponent;
  let fixture: ComponentFixture<NavbarLinkDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinkDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLinkDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
