import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactToastComponent } from '@client/app/sections/contact-toast/contact-toast.component';

describe('ContactToastComponent', () => {
  let component: ContactToastComponent;
  let fixture: ComponentFixture<ContactToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
