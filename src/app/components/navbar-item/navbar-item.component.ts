import { Component, Input } from '@angular/core';
import { NavBarItem } from '../../interfaces/navbar-item.interface';

@Component({
  selector: 'app-navbar-item',
  imports: [],
  templateUrl: './navbar-item.component.html',
  styles: ``,
})
export class NavbarItemComponent {
  @Input()
  set setNavBarItem(navBarItem: NavBarItem) {
    this._navBarItem = navBarItem;
  }

  private _navBarItem: NavBarItem = {
    id: 0,
    name: '',
    url: '',
    icon: '',
    isVisible: true
  };

  get getNavBarItem(): NavBarItem {
    return this._navBarItem;
  }
}
