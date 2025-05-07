import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Alignment } from '@client/app/shared/types';

@Component({
  selector: 'shared-caption',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './caption.component.html',
})
export class CaptionComponent {
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
