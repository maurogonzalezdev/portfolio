import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'section-skill-icon',
  imports: [NgIcon],
  templateUrl: './skill-icon.component.html',
  styleUrl: './skill-icon.component.css',
})
export class SkillIconComponent implements OnInit {
  @Input({ required: true })
  set setSkillIcon(icon: string) {
    if (!icon) return;

    this._skillIcon = icon;
    return;
  }

  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _skillIcon: string = '';
  private _breakpoint: Breakpoint = 'sm';

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getSkillIcon(): string {
    return this._skillIcon;
  }

  public getSize(): string {
    if (this._breakpoint === '4K') {
      return '50';
    } else if (this._breakpoint === '2K') {
      return '24';
    } else if (this._breakpoint === 'lg') {
      return '18';
    } else {
      return '22';
    }
  }
}
