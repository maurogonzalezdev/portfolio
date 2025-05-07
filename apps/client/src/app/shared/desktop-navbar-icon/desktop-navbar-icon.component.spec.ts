import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavbarIconComponent } from '@client/app/shared/desktop-navbar-icon/desktop-navbar-icon.component';

describe('DesktopNavbarIconComponent', () => {
  let component: DesktopNavbarIconComponent;
  let fixture: ComponentFixture<DesktopNavbarIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavbarIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopNavbarIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
