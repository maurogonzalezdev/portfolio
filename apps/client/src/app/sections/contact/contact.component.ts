import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { TitleComponent } from '@client/app/shared/title/title.component';

import { ContactForm } from '@client/app/sections/interfaces';
import { ContactToastComponent } from '@client/app/sections/contact-toast/contact-toast.component';

import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'section-contact',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    ReactiveFormsModule,
    ContactToastComponent,
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  private readonly _fB: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  public form!: FormGroup<ContactForm>;
  private _contactIcon: string = heroEnvelopeSolid;
  private _errorMessages = {
    required: 'Required field',
    email: 'Enter a valid email',
    minlength: (error: any) =>
      `Minimum ${error.requiredLength} characters required`,
  };

  constructor() {
    this.form = this._fB.group<ContactForm>({
      name: this._fB.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: this._fB.control<string>('', [
        Validators.required,
        Validators.email,
      ]),
      content: this._fB.control<string>('', [
        Validators.required,
        Validators.minLength(3),
      ]),
    });
  }

  get getContactIcon(): string {
    return this._contactIcon;
  }

  public submitForm(): void {
    if (this.form.errors) {
      return;
    } else {
      this.form.reset();
      this.form.markAsPristine();
    }
  }
  public getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required'] && control.touched) {
      return this._errorMessages['required'];
    }

    if (control.errors['email'] && control.touched) {
      return this._errorMessages['email'];
    }

    if (control.errors['minlength'] && control.touched) {
      return this._errorMessages['minlength'](control.errors['minlength']);
    }

    return 'Validation error';
  }
}
