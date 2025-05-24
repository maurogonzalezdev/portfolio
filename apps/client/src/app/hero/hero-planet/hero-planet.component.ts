import { Component, Input } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { Planet } from '@client/app/hero/interfaces';

@Component({
  selector: 'hero-planet',
  standalone: true,
  templateUrl: './hero-planet.component.html',
  styleUrl: './hero-planet.component.css',
})
export class HeroPlanetComponent {
  @Input({ required: true })
  set setPlanet(planet: Planet) {
    if (!planet) return;

    this._planet = planet;
    this._checkIfReady();
    return;
  }

  @Input({ required: true })
  set setBreakpoint(breakpoint: Breakpoint) {
    if (!breakpoint) return;

    this._breakpoint = breakpoint;
    this._checkIfReady();
    return;
  }

  private _planet: Planet = {
    id: 0,
    name: '',
    details: {
      coordinates: {
        sm: { top: 0, left: 0 },
        lg: { top: 0, left: 0 },
        fourK: { top: 0, left: 0 },
      },
      sizes: {
        sm: { width: 0, height: 0, image: '' },
        lg: { width: 0, height: 0, image: '' },
        fourK: { width: 0, height: 0, image: '' },
      },
    },
  };
  private _breakpoint: Breakpoint = 'sm';
  public _isReady: boolean = false;

  private _checkIfReady() {
    // We check if the planet ID is set
    if (this._planet.id !== 0) {
      this._isReady = true;
    }
  }

  public getPlanetStyle() {
    let imageUrl = '';

    if (this._breakpoint === 'sm' || this._breakpoint === 'md') {
      imageUrl = this._planet.details.sizes.sm.image;
      return {
        top: `${this._planet.details.coordinates.sm.top}%`,
        left: `${this._planet.details.coordinates.sm.left}%`,
        width: `${this._planet.details.sizes.sm.width}px`,
        height: `${this._planet.details.sizes.sm.height}px`,
        '--planet-image': `url(${imageUrl})`,
        visibility: this._isReady ? 'visible' : 'hidden',
        opacity: this._isReady ? '1' : '0',
      };
    }

    if (this._breakpoint === '4K') {
      imageUrl = this._planet.details.sizes.fourK.image;
      return {
        top: `${this._planet.details.coordinates.fourK.top}%`,
        left: `${this._planet.details.coordinates.fourK.left}%`,
        width: `${this._planet.details.sizes.fourK.width}px`,
        height: `${this._planet.details.sizes.fourK.height}px`,
        '--planet-image': `url(${imageUrl})`,
        visibility: this._isReady ? 'visible' : 'hidden',
        opacity: this._isReady ? '1' : '0',
      };
    }

    imageUrl = this._planet.details.sizes.lg.image;
    return {
      top: `${this._planet.details.coordinates.lg.top}%`,
      left: `${this._planet.details.coordinates.lg.left}%`,
      width: `${this._planet.details.sizes.lg.width}px`,
      height: `${this._planet.details.sizes.lg.height}px`,
      '--planet-image': `url(${imageUrl})`,
      visibility: this._isReady ? 'visible' : 'hidden',
      opacity: this._isReady ? '1' : '0',
    };
  }
}
