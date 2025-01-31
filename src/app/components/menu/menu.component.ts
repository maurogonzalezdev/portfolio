import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { MenuItem } from '../../interfaces/menu-item';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: 'app-menu',
  imports: [MenuItemComponent, MenuItemComponent],
  providers: [],
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent implements OnInit {
  private _menuService = inject(MenuService);

  private _homeItem: MenuItem = {
    name: 'heroDocumentDuplicate',
  };

  private _menuItems: MenuItem[] = [
    {
      url: 'settings',
      name: 'heroCog6Tooth',
    },
    {
      url: 'profile',
      name: 'heroUserCircle',
    },
    {
      url: 'cli',
      name: 'heroCommandLine',
    },
  ];

  private _isNavBarVisible: boolean = true;

  ngOnInit(): void {
    this._menuService.getMenuIsVisible().subscribe((data: boolean) => {
      this._isNavBarVisible = data;
    });
  }

  get getMenuItems(): MenuItem[] {
    return this._menuItems;
  }

  get getHomeItem(): MenuItem {
    return this._homeItem;
  }

  get getIsNavBarVisible(): boolean {
    return this._isNavBarVisible;
  }

  set setIsNavBarVisible(status: boolean) {
    this._menuService.setMenuIsVisible = status;
    return;
  }
}
