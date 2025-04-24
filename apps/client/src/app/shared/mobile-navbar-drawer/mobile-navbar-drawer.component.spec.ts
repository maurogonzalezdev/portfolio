import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileNavbarDrawerComponent } from '@client/app/shared/mobile-navbar-drawer/mobile-navbar-drawer.component';

describe('MobileNavbarDrawerComponent', () => {
  let component: MobileNavbarDrawerComponent;
  let fixture: ComponentFixture<MobileNavbarDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MobileNavbarDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNavbarDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
