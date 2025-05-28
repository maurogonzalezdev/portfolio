import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsTitleIconComponent } from '@client/app/features/sections/components/sections-title-icon/sections-title-icon.component';

describe('SectionsTitleIconComponent', () => {
  let component: SectionsTitleIconComponent;
  let fixture: ComponentFixture<SectionsTitleIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsTitleIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsTitleIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
