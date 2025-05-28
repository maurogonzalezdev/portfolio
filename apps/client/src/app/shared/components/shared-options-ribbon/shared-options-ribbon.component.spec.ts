import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedOptionsRibbonComponent } from '@client/app/shared/components/shared-options-ribbon/shared-options-ribbon.component';

describe('SharedOptionsRibbonComponent', () => {
  let component: SharedOptionsRibbonComponent;
  let fixture: ComponentFixture<SharedOptionsRibbonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedOptionsRibbonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedOptionsRibbonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
