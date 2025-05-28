import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarLinksDesktopComponent } from '@client/app/features/navbar/components/navbar-links-desktop/navbar-links-desktop.component';

describe('NavbarLinksDesktopComponent', () => {
  let component: NavbarLinksDesktopComponent;
  let fixture: ComponentFixture<NavbarLinksDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarLinksDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarLinksDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
