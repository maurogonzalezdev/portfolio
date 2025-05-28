import { Component, Input } from '@angular/core';

@Component({
  selector: 'hero-gradient',
  standalone: true,
  templateUrl: './hero-gradient.component.html',
  styleUrl: './hero-gradient.component.css',
})
export class HeroGradientComponent {
  @Input({ required: true })
  set setIsDarkMode(isDarkMode: boolean) {
    if (!isDarkMode) return;

    this._isDarkMode = isDarkMode;
    return;
  }

  private _isDarkMode: boolean = true;

  get getIsDarkMode(): boolean {
    return this._isDarkMode;
  }
}
