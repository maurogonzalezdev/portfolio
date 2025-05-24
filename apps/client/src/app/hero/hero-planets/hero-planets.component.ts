import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { HeroPlanetComponent } from '@client/app/hero/hero-planet/hero-planet.component';
import { Planet, PlanetItem } from '@client/app/hero/interfaces';
import { PlanetsService } from '@client/app/hero/services/planets.service';

@Component({
  selector: 'hero-planets',
  standalone: true,
  imports: [HeroPlanetComponent],
  templateUrl: './hero-planets.component.html',
  styleUrl: './hero-planets.component.css',
})
export class HeroPlanetsComponent {
  private readonly _planetsService: PlanetsService = inject(PlanetsService);
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);
  private readonly _destroyRef: DestroyRef = inject(DestroyRef);

  private _breakpoint: Breakpoint = 'sm';

  constructor() {
    this._breakpointObserverService
      .getBreakpoint$()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }

  public getPlanets(): Planet[] {
    return this._planetsService.getPlanets.map((planet: PlanetItem) => {
      const k: string = Object.keys(planet)[0];
      return planet[k];
    });
  }
}
