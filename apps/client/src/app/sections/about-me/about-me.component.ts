import { Component } from '@angular/core';

import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';

@Component({
  selector: 'section-about-me',
  standalone: true,
  imports: [ImagotypeComponent],
  templateUrl: './about-me.component.html',
})
export class AboutMeComponent {}
