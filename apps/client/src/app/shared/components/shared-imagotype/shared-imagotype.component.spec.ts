import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedImagotypeComponent } from '@client/app/shared/components/shared-imagotype/shared-imagotype.component';

describe('SharedImagotypeComponent', () => {
  let component: SharedImagotypeComponent;
  let fixture: ComponentFixture<SharedImagotypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedImagotypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedImagotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
