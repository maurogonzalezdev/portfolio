import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AboutMeComponent } from '@client/app/sections/about-me/about-me.component';
import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { ChangeUrlDirective } from '@client/app/shared/directives/change-url.directive';
import { ContactComponent } from '@client/app/sections/contact/contact.component';
import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';
import { DesktopThemeSwitcherComponent } from '@client/app/shared/desktop-theme-switcher/desktop-theme-switcher.component';
import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';
import { LastPostsComponent } from '@client/app/sections/last-posts/last-posts.component';
import { MobileNavbarComponent } from '@client/app/shared/mobile-navbar/mobile-navbar.component';
import { ProjectsComponent } from '@client/app/sections/projects/projects.component';
import { ScrollNavigatorComponent } from '@client/app/shared/scroll-navigator/scroll-navigator.component';
import { SkillsComponent } from '@client/app/sections/skills/skills.component';
import { VerticalDividerComponent } from '@client/app/shared/vertical-divider/vertical-divider.component';

import { heroChatBubbleBottomCenterTextSolid } from '@ng-icons/heroicons/solid';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [
    AboutMeComponent,
    ChangeUrlDirective,
    ContactComponent,
    DesktopNavbarComponent,
    DesktopThemeSwitcherComponent,
    HeroContainerComponent,
    LastPostsComponent,
    MobileNavbarComponent,
    ProjectsComponent,
    ScrollNavigatorComponent,
    SkillsComponent,
    VerticalDividerComponent,
  ],
  templateUrl: './layout.component.html',
})
export class LayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _lastPostsIcon: string = heroChatBubbleBottomCenterTextSolid;
  private _contactIcon: string = heroEnvelopeSolid;
  private _breakpoint: Breakpoint = 'sm';

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }
  get getLastPostsIcon(): string {
    return this._lastPostsIcon;
  }
  get getContactIcon(): string {
    return this._contactIcon;
  }
}
