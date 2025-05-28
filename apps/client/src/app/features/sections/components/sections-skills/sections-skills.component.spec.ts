import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSkillsComponent } from '@client/app/features/sections/components/sections-skills/sections-skills.component';

describe('SectionsSkillsComponent', () => {
  let component: SectionsSkillsComponent;
  let fixture: ComponentFixture<SectionsSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsSkillsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
