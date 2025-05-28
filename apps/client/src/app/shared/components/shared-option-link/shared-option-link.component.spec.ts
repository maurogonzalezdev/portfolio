import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOptionLinkComponent } from '@client/app/shared/components/shared-option-link/shared-option-link.component';

describe('SharedOptionLinkComponent', () => {
  let component: SharedOptionLinkComponent;
  let fixture: ComponentFixture<SharedOptionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedOptionLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedOptionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
