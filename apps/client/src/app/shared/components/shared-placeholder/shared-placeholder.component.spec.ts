import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedPlaceholderComponent } from '@client/app/shared/components/shared-placeholder/shared-placeholder.component';

describe('SharedPlaceholderComponent', () => {
  let component: SharedPlaceholderComponent;
  let fixture: ComponentFixture<SharedPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedPlaceholderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
