import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Alignment } from '@client/app/features/sections/models/types';
import { SectionsTitleIconComponent } from '@client/app/features/sections/components/sections-title-icon/sections-title-icon.component';

@Component({
  selector: 'sections-title',
  standalone: true,
  imports: [CommonModule, SectionsTitleIconComponent],
  templateUrl: './sections-title.component.html',
})
export class SectionsTitleComponent {
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

  // Title Properties
  private _title: string = '';
  private _subtitle: string = '';
  private _alignment: Alignment = 'left';
  private _icon: string = '';
  private _color: string = '';

  // Getters for Title Properties
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
