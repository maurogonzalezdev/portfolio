import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/core/models/types';
import { BreakpointObserverService } from '@client/app/core/services';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'sections-title-icon',
  imports: [NgIcon],
  templateUrl: './sections-title-icon.component.html',
})
export class SectionsTitleIconComponent implements OnInit {
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

  // Icon and color properties
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
  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }

  /**
   * This method returns the size of the icon based on the current breakpoint.
   * @returns {string} The size of the icon based on the current breakpoint.
   * @description Gets the size of the icon based on the current breakpoint.
   */
  public getSize(): string {
    if (this._breakpoint === '4K') {
      return '40';
    } else {
      return '20';
    }
  }
}
