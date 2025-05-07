import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'shared-desktop-navbar-icon',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './desktop-navbar-icon.component.html',
})
export class DesktopNavbarIconComponent implements OnInit {
  @Input({ required: true })
  set setIcon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }
  @Input({ required: true })
  set setColor(color: string) {
    if (!color) return;

    this._color = color;
    return;
  }

  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _breakpoint: Breakpoint = 'sm';
  private _icon: string = '';
  private _color: string = '';

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getIcon(): string {
    return this._icon;
  }
  get getColor(): string {
    return this._color;
  }

  public getSize(): string {
    if (this._breakpoint === '4K') {
      return '32';
    } else {
      return '16';
    }
  }
}
