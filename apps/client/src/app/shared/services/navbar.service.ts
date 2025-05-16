import { Injectable } from '@angular/core';

import { NavLinks, OptionLinks } from '@client/app/shared/types';

import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private _isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _navLinks: NavLinks = [
    {
      home: {
        id: 1,
        name: 'Home',
        fragment: 'home',
      },
    },
    {
      aboutMe: {
        id: 2,
        name: 'About Me',
        fragment: 'about-me',
      },
    },
    {
      projects: {
        id: 3,
        name: 'Projects',
        fragment: 'projects',
      },
    },
    {
      skills: {
        id: 4,
        name: 'Skills',
        fragment: 'skills',
      },
    },
    {
      posts: {
        id: 6,
        name: 'Posts',
        fragment: 'posts',
      },
    },
    {
      contact: {
        id: 5,
        name: 'Contact',
        fragment: 'contact',
      },
    },
  ];
  private _optionLinks: OptionLinks = [
    {
      downloadResume: {
        id: 1,
        name: 'Download Resume',
        url: 'https://drive.usercontent.google.com/uc?id=1Dar9fgvWvijhHlek8J-YylfEgCtxIVIu&export=download',
      },
    },
    {
      blog: {
        id: 2,
        name: 'Blog',
        url: '/blog',
      },
    },
    {
      github: {
        id: 3,
        name: 'Github',
        url: 'https://github.com/maurogonzalezdev',
      },
    },
  ];

  get getNavLinks(): NavLinks {
    return this._navLinks;
  }
  get getOptionLinks(): OptionLinks {
    return this._optionLinks;
  }

  public toggleIsOpen() {
    this._isOpen$.next(!this._isOpen$.value);
  }
  public getIsOpen$(): Observable<boolean> {
    return this._isOpen$.asObservable().pipe(distinctUntilChanged());
  }
}
