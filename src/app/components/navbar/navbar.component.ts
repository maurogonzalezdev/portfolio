import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NavBar } from '../../interfaces/navbar.interface';
import { NavbarItemComponent } from '../navbar-item/navbar-item.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroChevronDown, heroChevronRight } from '@ng-icons/heroicons/outline';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
  selector: 'app-navbar',
  imports: [NgIcon, NavbarItemComponent, NgScrollbarModule],
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
          icon: '/icons/html.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'about',
          icon: '/icons/css.svg',
          url: '/about',
          isVisible: true,
        },
        {
          id: 3,
          name: 'skills',
          icon: '/icons/javascript.svg',
          url: '/skills',
          isVisible: true,
        },
        {
          id: 4,
          name: 'resume',
          icon: '/icons/typescript.svg',
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
          icon: '/icons/angular_gradient.png',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'some-stunning-project',
          icon: '/icons/nest.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 3,
          name: 'some-stunning-project',
          icon: '/icons/nest.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 4,
          name: 'some-stunning-project',
          icon: '/icons/nodejs.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 5,
          name: 'some-stunning-project',
          icon: '/icons/angular_gradient.png',
          url: '/',
          isVisible: true,
        },
        {
          id: 6,
          name: 'some-stunning-project',
          icon: '/icons/angular_gradient.png',
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
          icon: '/icons/folder-mail-open.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 2,
          name: 'blog',
          icon: '/icons/markdown.svg',
          url: '/',
          isVisible: true,
        },
        {
          id: 3,
          name: 'social-networks',
          icon: '/icons/favicon.svg',
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
