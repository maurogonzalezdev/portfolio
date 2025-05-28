import { Component, inject } from '@angular/core';

import { NavbarService } from '@client/app/features/navbar/services';
import {
  OptionLink,
  OptionLinkItem,
} from '@client/app/shared/models/interfaces';
import { SharedOptionLinkComponent } from '@client/app/shared/components/shared-option-link/shared-option-link.component';
import { ThemeSwitcherComponent } from '@client/app/features/theme/components/theme-switcher/theme-switcher.component';

import { heroArrowUpRightMini } from '@ng-icons/heroicons/mini';

@Component({
  selector: 'shared-options-ribbon',
  standalone: true,
  imports: [ThemeSwitcherComponent, SharedOptionLinkComponent],
  templateUrl: './shared-options-ribbon.component.html',
  styleUrl: './shared-options-ribbon.component.css',
})
export class SharedOptionsRibbonComponent {
  private readonly _navbarService: NavbarService = inject(NavbarService);

  private _arrowIcon: string = heroArrowUpRightMini;

  get getArrowIcon(): string {
    return this._arrowIcon;
  }

  /**
   * This method retrieves the option links from the NavbarService.
   * @returns {OptionLink[]} An array of option links.
   * @description This method retrieves the option links from the NavbarService.
   */
  public getOptionLinks(): OptionLink[] {
    return this._navbarService.getOptionLinks.map((link: OptionLinkItem) => {
      const k: string = Object.keys(link)[0];
      return link[k];
    });
  }
}
