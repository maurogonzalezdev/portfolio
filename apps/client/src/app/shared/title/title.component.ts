import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Alignment } from '@client/app/shared/types';
import { TitleIconComponent } from '@client/app/shared/title-icon/title-icon.component';

@Component({
  selector: 'shared-title',
  standalone: true,
  imports: [CommonModule, TitleIconComponent],
  templateUrl: './title.component.html',
})
export class TitleComponent {
  @Input({ required: true })
  set setTitle(title: string) {
    if (!title) return;

    this._title = title;
    return;
  }
  @Input({ required: true })
  set setSubtitle(subtitle: string) {
    if (!subtitle) return;

    this._subtitle = subtitle;
    return;
  }
  @Input({ required: true })
  set setAlign(alignment: Alignment) {
    if (!alignment) return;

    this._alignment = alignment;
    return;
  }
  @Input({ required: true })
  set icon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }
  @Input({ required: true })
  set color(color: string) {
    if (!color) return;

    this._color = color;
    return;
  }

  private _title: string = '';
  private _subtitle: string = '';
  private _alignment: Alignment = 'left';
  private _icon: string = '';
  private _color: string = '';

  get getTitle(): string {
    return this._title;
  }
  get getAlignment(): Alignment {
    return this._alignment;
  }
  get getSubtitle(): string {
    return this._subtitle;
  }
  get getIcon(): string {
    return this._icon;
  }
  get getColor(): string {
    return this._color;
  }
}
