import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsTitleComponent } from '@client/app/features/sections/components/sections-title/sections-title.component';

describe('SectionsTitleComponent', () => {
  let component: SectionsTitleComponent;
  let fixture: ComponentFixture<SectionsTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
