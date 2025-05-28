import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSkillIconComponent } from '@client/app/features/sections/components/sections-skill-icon/sections-skill-icon.component';

describe('SectionsSkillIconComponent', () => {
  let component: SectionsSkillIconComponent;
  let fixture: ComponentFixture<SectionsSkillIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsSkillIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsSkillIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
