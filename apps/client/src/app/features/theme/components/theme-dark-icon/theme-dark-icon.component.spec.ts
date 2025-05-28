import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeDarkIconComponent } from '@client/app/features/theme/components/theme-dark-icon/theme-dark-icon.component';

describe('ThemeDarkIconComponent', () => {
  let component: ThemeDarkIconComponent;
  let fixture: ComponentFixture<ThemeDarkIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeDarkIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeDarkIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
