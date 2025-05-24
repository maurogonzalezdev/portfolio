import { AsyncPipe } from '@angular/common';
import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AboutMeComponent } from '@client/app/sections/about-me/about-me.component';
import { BackToTopComponent } from '@client/app/shared/back-to-top/back-to-top.component';
import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { ContactComponent } from '@client/app/sections/contact/contact.component';
import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';
import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';
import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';
import { MobileHeroComponent } from '@client/app/hero/mobile-hero/mobile-hero.component';
import { MobileNavbarComponent } from '@client/app/shared/mobile-navbar/mobile-navbar.component';
import { NavbarService } from '@client/app/shared/services/navbar.service';
import { OptionsBarComponent } from '@client/app/shared/options-bar/options-bar.component';
import { PlaceholderComponent } from '@client/app/shared/placeholder/placeholder.component';
import { PostsComponent } from '@client/app/sections/posts/posts.component';
import { ProjectsComponent } from '@client/app/sections/projects/projects.component';
import { ScrollNavigatorComponent } from '@client/app/shared/scroll-navigator/scroll-navigator.component';
import { ScrollSpyDirective } from '@client/app/shared/directives/scroll-spy.directive';
import { SkillsComponent } from '@client/app/sections/skills/skills.component';
import { VerticalDividerComponent } from '@client/app/shared/vertical-divider/vertical-divider.component';

import { Observable } from 'rxjs';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [
    AboutMeComponent,
    AsyncPipe,
    BackToTopComponent,
    ContactComponent,
    DesktopNavbarComponent,
    HeroContainerComponent,
    ImagotypeComponent,
    MobileHeroComponent,
    MobileNavbarComponent,
    OptionsBarComponent,
    PlaceholderComponent,
    PostsComponent,
    ProjectsComponent,
    ScrollNavigatorComponent,
    ScrollSpyDirective,
    SkillsComponent,
    VerticalDividerComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _isMobile: boolean = true;

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((breakpoint: Breakpoint) => {
        if (breakpoint !== 'sm' && breakpoint !== 'md') {
          this._isMobile = false;
        } else {
          this._isMobile = true;
        }
      });

    this._navbarService.initialNavigation();
  }

  get getIsMobile(): boolean {
    return this._isMobile;
  }

  public getCurrentFragment$(): Observable<string> {
    return this._navbarService.getCurrentFragment$;
  }
}
