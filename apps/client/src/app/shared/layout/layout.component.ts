import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';

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
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavbarService } from '../services/navbar.service';
import { ScrollSpyDirective } from '../directives/scroll-spy.directive';
import { ThemeSwitcherService } from '../services/theme-switcher.service';

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
    ScrollSpyDirective,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements OnInit, AfterViewInit {
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);
  private readonly _navbarService: NavbarService = inject(NavbarService);
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  private _isMobile: boolean = true;

  constructor() {
    this._themeSwitcherService.initTheme();
  }
  ngAfterViewInit(): void {
    this._navbarService.initialNavigation();
  }

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
  }

  get getIsMobile(): boolean {
    return this._isMobile;
  }
}
