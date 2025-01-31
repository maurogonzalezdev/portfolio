import { Component, Input } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item.interface';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroCog6Tooth,
  heroCommandLine,
  heroDocumentDuplicate,
  heroUserCircle,
} from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu-item',
  imports: [NgIcon, RouterLink],
  providers:[    provideIcons({
    heroDocumentDuplicate,
    heroCog6Tooth,
    heroUserCircle,
    heroCommandLine,
  }),],
  templateUrl: './menu-item.component.html',
  styles: ``,
})
export class MenuItemComponent {
  @Input()
  set setMenuItem(menuItem: MenuItem) {
    this._menuItem = menuItem;
  }

  private _menuItem: MenuItem = {
    name: '',
    url: '',
  };

  get getMenuItem(): MenuItem {
    return this._menuItem;
  }
}
