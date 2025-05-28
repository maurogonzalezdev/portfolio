import { Component, Input } from '@angular/core';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'navbar-icon-desktop',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './navbar-icon-desktop.component.html',
})
export class NavbarIconDesktopComponent {
  @Input({ required: true })
  set setIcon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }
  @Input({ required: true })
  set setColor(color: string) {
    if (!color) return;

    this._color = color;
    return;
  }

  // Private properties to hold the icon and color
  private _icon: string = '';
  private _color: string = '';

  get getIcon(): string {
    return this._icon;
  }
  get getColor(): string {
    return this._color;
  }
}
