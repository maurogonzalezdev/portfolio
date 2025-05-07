import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesktopThemeSwitcherComponent } from '@client/app/shared/desktop-theme-switcher/desktop-theme-switcher.component';

describe('DesktopThemeSwitcherComponent', () => {
  let component: DesktopThemeSwitcherComponent;
  let fixture: ComponentFixture<DesktopThemeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesktopThemeSwitcherComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DesktopThemeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
