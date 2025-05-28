import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsProjectsComponent } from '@client/app/features/sections/components/sections-projects/sections-projects.component';

describe('SectionsProjectsComponent', () => {
  let component: SectionsProjectsComponent;
  let fixture: ComponentFixture<SectionsProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsProjectsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
