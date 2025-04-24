import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';

describe('DesktopNavbarComponent', () => {
  let component: DesktopNavbarComponent;
  let fixture: ComponentFixture<DesktopNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
