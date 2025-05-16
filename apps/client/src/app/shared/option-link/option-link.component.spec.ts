import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionLinkComponent } from '@client/app/shared/option-link/option-link.component';

describe('OptionLinkComponent', () => {
  let component: OptionLinkComponent;
  let fixture: ComponentFixture<OptionLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OptionLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
