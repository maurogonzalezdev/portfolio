import { Component, inject } from '@angular/core';

import { NavbarService } from '@client/app/shared/services/navbar.service';
import { OptionLink, OptionLinkItem } from '@client/app/shared/interfaces';
import { OptionLinkComponent } from '@client/app/shared/option-link/option-link.component';
import { ThemeSwitcherComponent } from '@client/app/shared/theme-switcher/theme-switcher.component';

import { heroArrowUpRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'shared-options-bar',
  standalone: true,
  imports: [ThemeSwitcherComponent, OptionLinkComponent],
  templateUrl: './options-bar.component.html',
  styleUrl: './options-bar.component.css',
})
export class OptionsBarComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _arrowIcon: string = heroArrowUpRightMini;

  get getArrowIcon(): string {
    return this._arrowIcon;
  }

  public getOptionLinks(): OptionLink[] {
    return this._navbarService.getOptionLinks.map((link: OptionLinkItem) => {
      const k: string = Object.keys(link)[0];
      return link[k];
    });
  }
}
