import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { OptionLink } from '@client/app/shared/models/interfaces';

import { NgIcon } from '@ng-icons/core';

@Component({
  selector: 'shared-option-link',
  standalone: true,
  imports: [RouterModule, NgIcon],
  templateUrl: './shared-option-link.component.html',
})
export class SharedOptionLinkComponent {
  @Input({ required: true })
  set setOptionLink(optionLink: OptionLink) {
    if (!optionLink) return;

    this._optionLink = optionLink;
    return;
  }
  @Input({ required: true })
  set setIcon(icon: string) {
    if (!icon) return;

    this._icon = icon;
    return;
  }

  private _optionLink: OptionLink = {
    id: 0,
    name: '',
    url: '',
  };
  private _icon: string = '';

  // Getters for the option link and icon
  get getOptionLink(): OptionLink {
    return this._optionLink;
  }
  get getIcon(): string {
    return this._icon;
  }
}
