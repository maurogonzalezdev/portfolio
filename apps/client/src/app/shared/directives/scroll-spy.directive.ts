import {
  AfterViewInit,
  Directive,
  ElementRef,
  inject,
  Input,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { NavbarService } from '@client/app/shared/services/navbar.service';

import { Subject } from 'rxjs';

@Directive({
  selector: '[sharedScrollSpy]',
})
export class ScrollSpyDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input({ required: true })
  set setId(id: string) {
    if (!id) return;

    this._id = id;
    return;
  }

  private _id: string = '';
  private _threshold: number = 0.6;
  private _rootMargin: string = '0px';
  private _observer: IntersectionObserver | null = null;
  private _intersect$: Subject<string> = new Subject<string>(); // Change to emit the ID

  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    if (!isPlatformServer(this._platformId)) {
      this._createObserver();
      this._startObserving();
    }
  }

  ngAfterViewInit() {
    this._intersect$.subscribe((id) => {
      this._navbarService.scrollSpy(id);
    });
  }

  private _createObserver(): void {
    const options = {
      root: null,
      rootMargin: this._rootMargin,
      threshold: this._threshold,
    };

    this._observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= this._threshold &&
          !this._navbarService.getIsProgrammaticScrolling
        ) {
          this._intersect$.next(this._id); // Pass the ID
        }
      });
    }, options);
  }

  private _startObserving() {
    this._observer?.observe(this._element.nativeElement);
  }

  ngOnDestroy() {
    if (this._observer) {
      this._observer.disconnect();
      this._observer = null;
    }
    this._intersect$.complete();
  }
}
