import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedVerticalDividerComponent } from '@client/app/shared/components/shared-vertical-divider/shared-vertical-divider.component';

describe('SharedVerticalDividerComponent', () => {
  let component: SharedVerticalDividerComponent;
  let fixture: ComponentFixture<SharedVerticalDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedVerticalDividerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedVerticalDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
