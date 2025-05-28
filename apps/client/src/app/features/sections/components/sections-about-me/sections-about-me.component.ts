import { Component } from '@angular/core';

import { SharedImagotypeComponent } from '@client/app/shared/components/shared-imagotype/shared-imagotype.component';

@Component({
  selector: 'sections-about-me',
  standalone: true,
  imports: [SharedImagotypeComponent],
  templateUrl: './sections-about-me.component.html',
})
export class SectionsAboutMeComponent {}
