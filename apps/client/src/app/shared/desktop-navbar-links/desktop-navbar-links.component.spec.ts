import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavbarLinksComponent } from '@client/app/shared/desktop-navbar-links/desktop-navbar-links.component';

describe('DesktopNavbarLinksComponent', () => {
  let component: DesktopNavbarLinksComponent;
  let fixture: ComponentFixture<DesktopNavbarLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavbarLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopNavbarLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
