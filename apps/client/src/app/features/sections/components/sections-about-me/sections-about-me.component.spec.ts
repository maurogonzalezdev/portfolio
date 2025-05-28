import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsAboutMeComponent } from '@client/app/features/sections/components/sections-about-me/sections-about-me.component';

describe('SecionsAboutMeComponent', () => {
  let component: SectionsAboutMeComponent;
  let fixture: ComponentFixture<SectionsAboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsAboutMeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsAboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
