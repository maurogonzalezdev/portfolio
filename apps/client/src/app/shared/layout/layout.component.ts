import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';

import { AboutMeComponent } from '@client/app/sections/about-me/about-me.component';
import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { ContactComponent } from '@client/app/sections/contact/contact.component';
import { DesktopNavbarComponent } from '@client/app/shared/desktop-navbar/desktop-navbar.component';
import { HeroContainerComponent } from '@client/app/hero/container/hero-container.component';
import { ImagotypeComponent } from '@client/app/shared/imagotype/imagotype.component';
import { MobileHeroComponent } from '@client/app/hero/mobile-hero/mobile-hero.component';
import { MobileNavbarComponent } from '@client/app/shared/mobile-navbar/mobile-navbar.component';
import { OptionsBarComponent } from '@client/app/shared/options-bar/options-bar.component';
import { PostsComponent } from '@client/app/sections/posts/posts.component';
import { ProjectsComponent } from '@client/app/sections/projects/projects.component';
import { ScrollNavigatorComponent } from '@client/app/shared/scroll-navigator/scroll-navigator.component';
import { SkillsComponent } from '@client/app/sections/skills/skills.component';
import { VerticalDividerComponent } from '@client/app/shared/vertical-divider/vertical-divider.component';

@Component({
  selector: 'shared-layout',
  standalone: true,
  imports: [
    CommonModule,
    AboutMeComponent,
    ContactComponent,
    DesktopNavbarComponent,
    HeroContainerComponent,
    PostsComponent,
    MobileNavbarComponent,
    ProjectsComponent,
    ScrollNavigatorComponent,
    SkillsComponent,
    VerticalDividerComponent,
    ImagotypeComponent,
    MobileHeroComponent,
    OptionsBarComponent,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

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

  get getIsMobile(): boolean {
    return this._isMobile;
  }
}
