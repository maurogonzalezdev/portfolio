import { Component, inject, OnInit } from '@angular/core';

import { AboutMeComponent } from '@client/app/sections/about-me/about-me.component';

import { ContactComponent } from '@client/app/sections/contact/contact.component';
import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';
import { DesktopThemeSwitcherComponent } from '@client/app/shared/desktop-theme-switcher/desktop-theme-switcher.component';
import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';
import { PostsComponent } from '@client/app/sections/posts/posts.component';
import { MobileNavbarComponent } from '@client/app/shared/mobile-navbar/mobile-navbar.component';
import { ProjectsComponent } from '@client/app/sections/projects/projects.component';
import { ScrollNavigatorComponent } from '@client/app/shared/scroll-navigator/scroll-navigator.component';
import { SkillsComponent } from '@client/app/sections/skills/skills.component';
import { VerticalDividerComponent } from '@client/app/shared/vertical-divider/vertical-divider.component';

import { heroChatBubbleBottomCenterTextSolid } from '@ng-icons/heroicons/solid';
import { heroEnvelopeSolid } from '@ng-icons/heroicons/solid';
import { CommonModule } from '@angular/common';
import { BreakpointObserverService } from '../services/breakpoint-observer.service';
import { Breakpoint } from '../types';
import { ImagotypeComponent } from '../imagotype/imagotype.component';
import { MobileHeroComponent } from '@client/app/hero/mobile-hero/mobile-hero.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [
    CommonModule,
    AboutMeComponent,
    ContactComponent,
    DesktopNavbarComponent,
    DesktopThemeSwitcherComponent,
    HeroContainerComponent,
    PostsComponent,
    MobileNavbarComponent,
    ProjectsComponent,
    ScrollNavigatorComponent,
    SkillsComponent,
    VerticalDividerComponent,
    ImagotypeComponent,
    MobileHeroComponent,
  ],
  templateUrl: './layout.component.html',
  styles: `
  .scroll-offset {
 scroll-snap-align: center;
}`,
})
export class LayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _lastPostsIcon: string = heroChatBubbleBottomCenterTextSolid;
  private _contactIcon: string = heroEnvelopeSolid;
  private _isMobile: boolean = true;

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        if (breakpoint !== 'sm' && breakpoint !== 'md') {
          this._isMobile = false;
        } else {
          this._isMobile = true;
        }
      });
  }

  get getLastPostsIcon(): string {
    return this._lastPostsIcon;
  }
  get getContactIcon(): string {
    return this._contactIcon;
  }
  get getIsMobile(): boolean {
    return this._isMobile;
  }
}
