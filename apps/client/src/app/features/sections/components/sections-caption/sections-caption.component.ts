import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Alignment } from '@client/app/features/sections/models/types';

@Component({
  selector: 'sections-caption',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections-caption.component.html',
})
export class SectionsCaptionComponent {
  @Input({ required: true })
  set setAlignment(alignment: Alignment) {
    if (!alignment) return;

    this._alignment = alignment;
    return;
  }
  @Input({ required: true })
  set setCaption(caption: string) {
    if (!caption) return;

    this._caption = caption;
    return;
  }

  private _alignment: Alignment = 'left';
  private _caption: string = '';

  get getAlignment(): Alignment {
    return this._alignment;
  }
  get getCaption() {
    return this._caption;
  }
}
