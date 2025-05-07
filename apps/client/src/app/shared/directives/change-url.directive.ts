import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Location } from '@angular/common';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';

@Directive({
  selector: '[changeUrl]',
  standalone: true,
})
export class ChangeUrlDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input('changeUrl')
  set setSectionId(id: string) {
    if (!id) return;

    this._sectionId = id.trim().toLowerCase();
    return;
  }

  private readonly _location: Location = inject(Location);
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _observer?: IntersectionObserver;
  private _sectionId!: string;
  private _breakpoint: Breakpoint = 'sm';

  constructor(private _element: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined') {
      this._observer = new IntersectionObserver(
        ([entry]) => {
          if (
            entry.isIntersecting &&
            this._breakpoint !== 'sm' &&
            this._breakpoint !== 'md'
          ) {
            if (this._sectionId === 'home' || this._sectionId === 'about-me') {
              this._location.replaceState(`/`);
            } else {
              this._location.replaceState(`#${this._sectionId}`);
            }
          } else if (
            entry.isIntersecting &&
            (this._breakpoint === 'sm' || this._breakpoint === 'md')
          ) {
            if (this._sectionId === 'home') {
              this._location.replaceState(`/`);
            } else {
              this._location.replaceState(`#${this._sectionId}`);
            }
          }
        },
        { threshold: 0.5 }
      );
      this._observer.observe(this._element.nativeElement);
    }
  }

  ngOnDestroy(): void {
    if (this._observer) {
      this._observer.disconnect();
    }
  }
}
