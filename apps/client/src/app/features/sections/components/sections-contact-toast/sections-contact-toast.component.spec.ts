import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionsContactToastComponent } from '@client/app/features/sections/components/sections-contact-toast/sections-contact-toast.component';

describe('SectionsContactToastComponent', () => {
  let component: SectionsContactToastComponent;
  let fixture: ComponentFixture<SectionsContactToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionsContactToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionsContactToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
