import { Injectable } from '@angular/core';

import { NavLinks } from '@client/app/shared/types';

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
      contact: {
        id: 5,
        name: 'Contact',
        fragment: 'contact',
      },
    },
    {
      blog: {
        id: 6,
        name: 'Blog',
        fragment: '/blog',
      },
    },
  ];

  get navLinks(): NavLinks {
    return this._navLinks;
  }

  public toggleIsOpen() {
    this._isOpen$.next(!this._isOpen$.value);
  }

  public getIsOpen$(): Observable<boolean> {
    return this._isOpen$.asObservable().pipe(distinctUntilChanged());
  }
}
