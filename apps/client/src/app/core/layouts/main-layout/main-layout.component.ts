import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Breakpoint } from '@client/app/core/models/types';
import {
  BreakpointObserverService,
  LoggingService,
} from '@client/app/core/services';
import { HeroContainerComponent } from '@client/app/features/hero/containers/hero-container/hero-container.component';
import { HeroSectionMobileComponent } from '@client/app/features/hero/components/hero-section-mobile/hero-section-mobile.component';
import { NavbarDesktopComponent } from '@client/app/features/navbar/components/navbar-desktop/navbar-desktop.component';
import { NavbarMobileComponent } from '@client/app/features/navbar/components/navbar-mobile/navbar-mobile.component';
import { NavbarService } from '@client/app/features/navbar/services';
import { ScrollSpyDirective } from '@client/app/shared/directives';
import { SectionsAboutMeComponent } from '@client/app/features/sections/components/sections-about-me/sections-about-me.component';
import { SectionsContactComponent } from '@client/app/features/sections/components/sections-contact/sections-contact.component';
import { SectionsPostsComponent } from '@client/app/features/sections/components/sections-posts/sections-posts.component';
import { SectionsProjectsComponent } from '@client/app/features/sections/components/sections-projects/sections-projects.component';
import { SectionsSkillsComponent } from '@client/app/features/sections/components/sections-skills/sections-skills.component';
import { SharedBackToTopComponent } from '@client/app/shared/components/shared-back-to-top/shared-back-to-top.component';
import { SharedImagotypeComponent } from '@client/app/shared/components/shared-imagotype/shared-imagotype.component';
import { SharedOptionsRibbonComponent } from '@client/app/shared/components/shared-options-ribbon/shared-options-ribbon.component';
import { SharedPlaceholderComponent } from '@client/app/shared/components/shared-placeholder/shared-placeholder.component';
import { SharedScrollNavigatorComponent } from '@client/app/shared/components/shared-scroll-navigator/shared-scroll-navigator.component';
import { SharedVerticalDividerComponent } from '@client/app/shared/components/shared-vertical-divider/shared-vertical-divider.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [
    SectionsAboutMeComponent,
    AsyncPipe,
    SharedBackToTopComponent,
    SectionsContactComponent,
    NavbarDesktopComponent,
    HeroContainerComponent,
    SharedImagotypeComponent,
    HeroSectionMobileComponent,
    NavbarMobileComponent,
    SharedOptionsRibbonComponent,
    SharedPlaceholderComponent,
    SectionsPostsComponent,
    SectionsProjectsComponent,
    SharedScrollNavigatorComponent,
    ScrollSpyDirective,
    SectionsSkillsComponent,
    SharedVerticalDividerComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _loggingService: LoggingService = inject(LoggingService);

  private _isMobile: boolean = true;

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((breakpoint: Breakpoint) => {
        this._loggingService.log(
          'info',
          `Breakpoint changed to ${breakpoint} in MainLayoutComponent`
        );
        if (breakpoint !== 'sm' && breakpoint !== 'md') {
          this._isMobile = false;
        } else {
          this._isMobile = true;
        }
      });

    this._navbarService.initialNavigation();
    this._loggingService.log(
      'info',
      'Initial navigation completed in MainLayoutComponent'
    );
  }

  get getIsMobile(): boolean {
    return this._isMobile;
  }

  // Method to get the current fragment from the NavbarService
  public getCurrentFragment$(): Observable<string> {
    return this._navbarService.getCurrentFragment$;
  }
}
