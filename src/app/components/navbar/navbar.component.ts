import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgStyle } from '@angular/common';
import { NavBar } from '../../interfaces/navbar.interface';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
heroChevronDown,
heroChevronRight
} from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon,NgStyle, NavbarItemComponent],
  providers: [ provideIcons({
      heroChevronDown,
      heroChevronRight
    })],
  templateUrl: './navbar.component.html',
  styles: ``,
})
export class NavbarComponent {
  private _menuService = inject(MenuService);

  private _isNavBarVisible: boolean = true;

  private _isNavBarItemVisible: boolean = true;

  private _navBar: NavBar[] = [
    {
      id: 1,
      section: 'about',
      items: [
        {
          id: 1,
          name: 'home',
          icon: 'iconHome',
          url: '/',
          isVisible: true
        },
      ],
      isVisible: true,
    },
    {
      id: 2,
      section: 'about2',
      items: [
        {
          id: 2,
          name: 'home2',
          icon: 'iconHome',
          url: '/',
          isVisible: true
        },
      ],
      isVisible: true,
    },
  ];

  ngOnInit(): void {
    this._menuService.getMenuIsVisible().subscribe((data: boolean) => {
      this._isNavBarVisible = data;
    });
  }

  get getIsNavBarVisible(): boolean {
    return this._isNavBarVisible;
  }

  get getIsNavBarItemVisible(): boolean {
    return this._isNavBarItemVisible;
  }

  set setNavBarItemVisible(status: boolean) {
    this._isNavBarItemVisible = status;
  }

  get getNavBar(): NavBar[] {
    return this._navBar;
  }

  public getSectionIcon(status: boolean): string{
    return status ? 'heroChevronDown' : 'heroChevronRight';
  }
}
