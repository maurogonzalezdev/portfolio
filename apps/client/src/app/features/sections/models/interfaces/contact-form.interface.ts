import { FormControl } from '@angular/forms';

export interface ContactForm {
  email: FormControl<string>;
  name: FormControl<string>;
  content: FormControl<string>;
}
