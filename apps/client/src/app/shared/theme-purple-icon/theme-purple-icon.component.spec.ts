import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemePurpleIconComponent } from '@client/app/shared/theme-purple-icon/theme-purple-icon.component';

describe('ThemePurpleIconComponent', () => {
  let component: ThemePurpleIconComponent;
  let fixture: ComponentFixture<ThemePurpleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemePurpleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemePurpleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
