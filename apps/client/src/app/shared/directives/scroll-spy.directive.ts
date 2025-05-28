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

import { LoggingService } from '@client/app/core/services';
import { NavbarService } from '@client/app/features/navbar/services';

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

  private _intersect$: Subject<string> = new Subject<string>(); // Change to emit the ID
  private readonly _platformId: Object = inject(PLATFORM_ID);
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _navbarService: NavbarService = inject(NavbarService);

  // Default values for IntersectionObserver
  private _id: string = '';
  private _threshold: number = 0.6;
  private _rootMargin: string = '0px';
  private _observer: IntersectionObserver | null = null;

  constructor(private _element: ElementRef) {}

  ngOnInit() {
    if (!isPlatformServer(this._platformId)) {
      this._loggingService.log('info', 'ScrollSpyDirective initialized');
      this._createObserver();
      this._startObserving();
    }
  }

  ngAfterViewInit() {
    this._intersect$.subscribe((id) => {
      this._navbarService.scrollSpy(id);
    });
  }

  // Method to create the IntersectionObserver
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

  // Method to start observing the element
  private _startObserving() {
    this._loggingService.log(
      'info',
      `Starting to observe element with ID: ${this._id}`
    );
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
