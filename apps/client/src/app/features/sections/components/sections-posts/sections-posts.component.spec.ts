import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsPostsComponent } from '@client/app/features/sections/components/sections-posts/sections-posts.component';

describe('SectionsPostsComponent', () => {
  let component: SectionsPostsComponent;
  let fixture: ComponentFixture<SectionsPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsPostsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
