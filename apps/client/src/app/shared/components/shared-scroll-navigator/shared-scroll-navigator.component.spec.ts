import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedScrollNavigatorComponent } from '@client/app/shared/components/shared-scroll-navigator/shared-scroll-navigator.component';

describe('SharedScrollNavigatorComponent', () => {
  let component: SharedScrollNavigatorComponent;
  let fixture: ComponentFixture<SharedScrollNavigatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SharedScrollNavigatorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SharedScrollNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
