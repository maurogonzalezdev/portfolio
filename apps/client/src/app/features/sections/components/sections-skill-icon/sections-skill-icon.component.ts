import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/core/models/types';
import { BreakpointObserverService } from '@client/app/core/services';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'sections-skill-icon',
  imports: [NgIcon],
  templateUrl: './sections-skill-icon.component.html',
  styleUrl: './sections-skill-icon.component.css',
})
export class SectionsSkillIconComponent implements OnInit {
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

  // Returns the size of the icon based on the current breakpoint
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
