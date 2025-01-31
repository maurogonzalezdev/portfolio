import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgStyle } from '@angular/common';
import { NavBar } from '../../interfaces/navbar.interface';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronRight } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, NgStyle, NavbarItemComponent],
  providers: [
    provideIcons({
      heroChevronDown,
      heroChevronRight,
    }),
  ],
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
      section: 'main',
      items: [
        {
          id: 1,
          name: 'index',
          icon: 'html.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'about',
          icon: 'css.svg',
          url: '/about',
          isVisible: true,
        },
        {
          id: 3,
          name: 'skills',
          icon: 'javascript.svg',
          url: '/skills',
          isVisible: true,
        },
        {
          id: 4,
          name: 'resume',
          icon: 'typescript.svg',
          url: '/resume',
          isVisible: true,
        },
      ],
      isVisible: true,
    },
    {
      id: 2,
      section: 'projects',
      items: [
        {
          id: 1,
          name: 'some-stunning-project',
          icon: 'angular.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'some-stunning-project',
          icon: 'nest.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 3,
          name: 'some-stunning-project',
          icon: 'nest.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 4,
          name: 'some-stunning-project',
          icon: 'nodejs.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 5,
          name: 'some-stunning-project',
          icon: 'angular.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 6,
          name: 'some-stunning-project',
          icon: 'angular.svg',
          url: '/',
          isVisible: true,
        },
      ],
      isVisible: true,
    },
    {
      id: 3,
      section: 'contact',
      items: [
        {
          id: 1,
          name: 'email-me',
          icon: 'folder-mail-open.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'blog',
          icon: 'markdown.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 3,
          name: 'social-networks',
          icon: 'favicon.svg',
          url: '/',
          isVisible: true,
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

  public getSectionIcon(status: boolean): string {
    return status ? 'heroChevronDown' : 'heroChevronRight';
  }
}
