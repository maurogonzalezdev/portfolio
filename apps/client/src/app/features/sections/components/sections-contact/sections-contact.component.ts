import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ContactForm } from '@client/app/features/sections/models/interfaces';
import { LoggingService } from '@client/app/core/services';
import { SectionsContactToastComponent } from '@client/app/features/sections/components/sections-contact-toast/sections-contact-toast.component';
import { SectionsTitleComponent } from '@client/app/features/sections/components/sections-title/sections-title.component';

import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'sections-contact',
  standalone: true,
  imports: [
    CommonModule,
    SectionsTitleComponent,
    ReactiveFormsModule,
    SectionsContactToastComponent,
  ],
  templateUrl: './sections-contact.component.html',
  styleUrl: './sections-contact.component.css',
})
export class SectionsContactComponent {
  private readonly _fB: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  private readonly _loggingService: LoggingService = inject(LoggingService);

  public form!: FormGroup<ContactForm>;
  private _contactIcon: string = heroEnvelopeSolid;
  // Error messages for the form validation
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
      this._loggingService.log(
        'error',
        'Form submission failed due to validation errors'
      );
      return;
    } else {
      this._loggingService.log('info', 'Form submitted successfully');
      this.form.reset();
      this.form.markAsPristine();
    }
  }
  /**
   * Gets the error message for a specific form control based on its validation state.
   * @param {string} controlName - The name of the form control to get the error message for
   * @returns {string} - The error message for the form control, or an empty string if there are no errors or the control is not touched
   * @description This method checks the validation state of a form control and returns an appropriate error message based on the type of validation error encountered.
   */
  public getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);

    if (!control || !control.errors || !control.touched) return '';

    if (control.errors['required'] && control.touched) {
      this._loggingService.log('warn', `Field ${controlName} is required`);
      return this._errorMessages['required'];
    }

    if (control.errors['email'] && control.touched) {
      this._loggingService.log(
        'warn',
        `Field ${controlName} is not a valid email`
      );
      return this._errorMessages['email'];
    }

    if (control.errors['minlength'] && control.touched) {
      this._loggingService.log('warn', `Field ${controlName} is too short`);
      return this._errorMessages['minlength'](control.errors['minlength']);
    }

    return 'Validation error';
  }
}
