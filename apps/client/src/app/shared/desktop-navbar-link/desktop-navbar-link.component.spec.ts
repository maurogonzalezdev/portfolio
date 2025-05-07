import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavbarLinkComponent } from '@client/app/shared/desktop-navbar-link/desktop-navbar-link.component';

describe('DesktopNavbarLinkComponent', () => {
  let component: DesktopNavbarLinkComponent;
  let fixture: ComponentFixture<DesktopNavbarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavbarLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopNavbarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
