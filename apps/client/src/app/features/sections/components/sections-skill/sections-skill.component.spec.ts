import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsSkillComponent } from '@client/app/features/sections/components/sections-skill/sections-skill.component';

describe('SectionsSkillComponent', () => {
  let component: SectionsSkillComponent;
  let fixture: ComponentFixture<SectionsSkillComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsSkillComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
