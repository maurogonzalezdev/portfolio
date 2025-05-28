import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsLastPostComponent } from '@client/app/features/sections/components/sections-last-post/sections-last-post.component';

describe('SectionsLastPostComponent', () => {
  let component: SectionsLastPostComponent;
  let fixture: ComponentFixture<SectionsLastPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsLastPostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsLastPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
