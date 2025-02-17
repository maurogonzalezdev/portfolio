import { Component, Input } from '@angular/core';
import { FullScreenComponent } from '../../components/full-screen/full-screen.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroHeart } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-ribbon-layout',
  standalone: true,
  imports: [FullScreenComponent,NgIcon],
  templateUrl: './ribbon-layout.component.html',
  providers: [
    provideIcons({
        heroHeart
      })
  ],
})
export class RibbonLayoutComponent {
  @Input()
  set setPosition(position: 'top' | 'bottom') {
    if (!position) {
      return;
    }
    this._position = position;
  }

  private _position: 'top' | 'bottom' = 'top';

  get getPosition(): 'top' | 'bottom' {
    return this._position;
  }
}
