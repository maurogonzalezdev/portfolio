import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsContactComponent } from '@client/app/features/sections/components/sections-contact/sections-contact.component';

describe('SectionsContactComponent', () => {
  let component: SectionsContactComponent;
  let fixture: ComponentFixture<SectionsContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
