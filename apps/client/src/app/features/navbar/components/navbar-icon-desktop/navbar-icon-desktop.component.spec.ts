import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarIconDesktopComponent } from '@client/app/features/navbar/components/navbar-icon-desktop/navbar-icon-desktop.component';

describe('NavbarIconDesktopComponent', () => {
  let component: NavbarIconDesktopComponent;
  let fixture: ComponentFixture<NavbarIconDesktopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarIconDesktopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarIconDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
