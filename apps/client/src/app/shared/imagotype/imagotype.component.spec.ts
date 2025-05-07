import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';

describe('ImagotypeComponent', () => {
  let component: ImagotypeComponent;
  let fixture: ComponentFixture<ImagotypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImagotypeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImagotypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
