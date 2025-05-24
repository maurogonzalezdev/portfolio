import { DOCUMENT, isPlatformServer, Location } from '@angular/common';
import { inject, Injectable, NgZone, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';

import { Breakpoint, NavLinks, OptionLinks } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { environment } from '@client/environments/environment';
import { LoggingService } from '@client/app/shared/services/logging.service';

import { heroCodeBracketSquareSolid } from '@ng-icons/heroicons/solid';
import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';
import { heroHomeSolid } from '@ng-icons/heroicons/solid';
import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';
import { heroMegaphoneSolid } from '@ng-icons/heroicons/solid';
import { heroUserCircleSolid } from '@ng-icons/heroicons/solid';
import { BehaviorSubject, distinctUntilChanged, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _document: Document = inject(DOCUMENT);
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _location: Location = inject(Location);
  private readonly _router: Router = inject(Router);
  private readonly _ngZone: NgZone = inject(NgZone);
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private _isOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private _currentFragment$: BehaviorSubject<string> =
    new BehaviorSubject<string>('/');
  private _isProgrammaticScrolling: boolean = false;
  private readonly _scrollingTimeout: number = 1000; // 1 second debounce
  private _breakpoint: Breakpoint = 'sm';
  private _navLinks: NavLinks = [
    {
      home: {
        id: 1,
        name: 'Home',
        fragment: '/',
        icon: heroHomeSolid,
      },
    },
    {
      aboutMe: {
        id: 2,
        name: 'About Me',
        fragment: '#about-me',
        icon: heroUserCircleSolid,
      },
    },
    {
      projects: {
        id: 3,
        name: 'Projects',
        fragment: '#projects',
        icon: heroCodeBracketSquareSolid,
      },
    },
    {
      skills: {
        id: 4,
        name: 'Skills',
        fragment: '#skills',
        icon: heroRocketLaunchSolid,
      },
    },
    {
      posts: {
        id: 5,
        name: 'Posts',
        fragment: '#posts',
        icon: heroDocumentTextSolid,
      },
    },
    {
      contact: {
        id: 6,
        name: 'Contact',
        fragment: '#contact',
        icon: heroEnvelopeSolid,
      },
    },
    {
      blog: {
        id: 7,
        name: 'Blog',
        fragment: '/blog',
        icon: heroMegaphoneSolid,
      },
    },
  ];
  private _optionLinks: OptionLinks = [
    {
      downloadResume: {
        id: 1,
        name: 'Download Resume',
        url: environment.resumeUrl,
      },
    },
    {
      linkedin: {
        id: 2,
        name: 'LinkedIn',
        url: process.env.PORTFOLIO_CLIENT_LINKEDIN_URL,
      },
    },
    {
      github: {
        id: 3,
        name: 'Github',
        url: process.env.PORTFOLIO_CLIENT_GITHUB_URL,
      },
    },
  ];

  constructor() {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
        this._loggingService.log(
          'info',
          `Breakpoint changed to: ${breakpoint}`
        );
      });
  }

  get getNavLinks(): NavLinks {
    return this._navLinks;
  }
  get getOptionLinks(): OptionLinks {
    return this._optionLinks;
  }
  get getCurrentFragment$(): Observable<string> {
    return this._currentFragment$.asObservable();
  }
  get getIsProgrammaticScrolling(): boolean {
    return this._isProgrammaticScrolling;
  }

  private _preventDefault(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    return;
  }
  private _scrollIntoView(element: Element): void {
    // Set flag before scrolling
    this._isProgrammaticScrolling = true;

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });

    // Reset flag after animation completes
    setTimeout(() => {
      this._isProgrammaticScrolling = false;
    }, this._scrollingTimeout);

    return;
  }
  private _replaceState(fragment: string): void {
    this._location.replaceState(fragment);

    return;
  }
  private _isDesktop(): boolean {
    return this._breakpoint !== 'sm' && this._breakpoint !== 'md';
  }
  private _isHomeFragment(fragment: string): boolean {
    return (
      fragment === '/' ||
      fragment === '' ||
      fragment === 'home' ||
      fragment === '#home' ||
      !fragment
    );
  }
  private _runOutsideAngular(fn: () => any, time: number = 0) {
    this._ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        fn();
      }, time);
    });

    return;
  }
  private _navigateToHome(fragment: string | null): void {
    if (this._isDesktop()) {
      // Desktop behavior: Navigate to about-me section
      const element: Element | null = this._document.querySelector('#about-me');

      if (!element) {
        this._loggingService.log(
          'error',
          `Element with fragment ${fragment} not found`
        );
      } else {
        // Update the current fragment internally for styling
        this._currentFragment$.next('/');

        // Keep URL as root without fragment
        this._replaceState('/');

        // Scroll to home element
        this._scrollIntoView(element);
      }
    } else {
      // Mobile behavior: Navigate to home section
      const element: Element | null = this._document.querySelector('#home');

      if (!element) {
        this._loggingService.log('error', `Element with id 'home' not found`);
      } else {
        // Update the current fragment internally for styling
        this._currentFragment$.next('/');

        // Keep URL as root without fragment
        this._replaceState('/');

        // Scroll to home element
        this._scrollIntoView(element);
      }
    }

    return;
  }
  private _navigateToBlog(fragment: string): void {
    fragment === '/blog' ? this._router.navigate([fragment]) : null;

    return;
  }
  private _navigateByFragment(fragment: string): void {
    // For fragment navigation
    const element = this._document.querySelector(fragment);

    if (!element) {
      this._loggingService.log(
        'error',
        `Element with fragment ${fragment} not found`
      );
      return;
    } else {
      this._currentFragment$.next(fragment);

      // Update URL without reloading
      this._replaceState(fragment);

      // Scroll to element
      this._scrollIntoView(element);
    }

    return;
  }

  public toggleIsOpen() {
    this._isOpen$.next(!this._isOpen$.value);
  }
  public getIsOpen$(): Observable<boolean> {
    return this._isOpen$.asObservable().pipe(distinctUntilChanged());
  }
  public navigateToFragment(fragment: string, event?: Event): void {
    if (event) {
      this._preventDefault(event);
    }

    this._runOutsideAngular(() => {
      this._loggingService.log('info', `Navigating to : ${fragment}`);

      // Update state immediately without waiting for scroll spy
      if (this._isDesktop()) {
        // Desktop: Both home and about-me are treated as root
        if (this._isHomeFragment(fragment) || fragment === '#about-me') {
          this._currentFragment$.next('/');
          this._replaceState('/');
        } else if (!fragment.startsWith('/')) {
          this._currentFragment$.next(fragment);
          this._replaceState(fragment);
        }
      } else {
        // Mobile: Just home is root
        if (this._isHomeFragment(fragment)) {
          this._currentFragment$.next('/');
          this._replaceState('/');
        } else if (!fragment.startsWith('/')) {
          this._currentFragment$.next(fragment);
          this._replaceState(fragment);
        }
      }

      // Handle navigation
      if (this._isHomeFragment(fragment)) {
        this._navigateToHome(fragment);
      } else if (!fragment.startsWith('/')) {
        this._navigateByFragment(fragment);
      } else {
        this._navigateToBlog(fragment);
      }

      return;
    });
  }
  /**
   * Handles initial navigation when app loads
   * Adds delay for mobile devices to ensure proper rendering
   */
  public initialNavigation(): void {
    if (isPlatformServer(this._platformId)) return;

    this._runOutsideAngular(() => {
      // Get fragment from URL
      const fragment = this._location.path(true);

      // Desktop: special case for both home and about-me
      if (
        this._isDesktop() &&
        (this._isHomeFragment(fragment) || fragment === '#about-me')
      ) {
        this._currentFragment$.next('/');
        return;
      }

      // Mobile: special case only for home
      if (!this._isDesktop() && this._isHomeFragment(fragment)) {
        this._currentFragment$.next('/');
        return;
      }

      if (fragment.includes('#')) {
        const elementId = fragment.split('#')[1];
        const element = this._document.getElementById(elementId);

        if (element) {
          this._isProgrammaticScrolling = true;
          this._currentFragment$.next(fragment);

          const performScroll = () => {
            // Scroll with appropriate behavior
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest',
            });

            // Reset flag after scrolling completes
            setTimeout(() => {
              this._isProgrammaticScrolling = false;
            }, 500);
          };

          // Add delay for mobile devices
          if (!this._isDesktop()) {
            // 50ms delay for mobile/tablet devices
            setTimeout(performScroll, 50);
          } else {
            // No delay for desktop devices
            performScroll();
          }
        }
      }

      return;
    });
  }
  /* Handles scroll spy events when elements enter the viewport */
  public scrollSpy(fragment: string): void {
    // Skip if we're in the middle of programmatic scrolling
    if (this._isProgrammaticScrolling) return;

    this._runOutsideAngular(() => {
      if (this._isDesktop()) {
        // Desktop: both home and about-me are treated as root
        if (this._isHomeFragment(fragment) || fragment === '#about-me') {
          this._currentFragment$.next('/');
          this._replaceState('/');
        } else {
          this._currentFragment$.next(fragment);
          this._replaceState(fragment);
        }
      } else {
        // Mobile: only home is treated as root
        if (this._isHomeFragment(fragment)) {
          this._currentFragment$.next('/');
          this._replaceState('/');
        } else {
          this._currentFragment$.next(fragment);
          this._replaceState(fragment);
        }
      }

      return;
    });
  }
}
