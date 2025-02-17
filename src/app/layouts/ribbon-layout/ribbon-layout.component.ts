import { Component, Input } from '@angular/core';
import { FullScreenComponent } from '../../components/full-screen/full-screen.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';
import { RouterLink } from '@angular/router';
import { TitleCasePipe, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-ribbon-layout',
  standalone: true,
  imports: [FullScreenComponent, NgIcon, RouterLink, TitleCasePipe],
  templateUrl: './ribbon-layout.component.html',
  providers: [
    provideIcons({
      heroHeart,
    }),
  ],
})
export class RibbonLayoutComponent {
  @Input()
  set setPosition(position: 'top' | 'bottom') {
    if (!position) {
      return;
    }
    this._position = position;
  }

  private _position: 'top' | 'bottom' = 'top';
  private _topNavBar: string[] = [
    'home',
    'main',
    'settings',
    'cli',
    'projects',
    'contact',
  ];

  get getPosition(): 'top' | 'bottom' {
    return this._position;
  }

  get getTopNavBar(): string[] {
    return this._topNavBar;
  }
}
