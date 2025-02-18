import { Component, Input } from '@angular/core';
import { SingleLink } from '../../interfaces/single-link.interface';

@Component({
  selector: 'app-social-network',
  imports: [],
  templateUrl: './social-network.component.html',
  styles: ``,
})
export class SocialNetworkComponent {
  @Input()
  set setSocialNetwork(link: SingleLink) {
    if (!link) {
      return;
    }

    this._socialNetwork = link;
  }

  private _socialNetwork: SingleLink = {
    id: 0,
    name: '',
    url: '',
    icon: '',
    isVisible: false,
  };

  get getSocialNetwork(): SingleLink {
    return this._socialNetwork;
  }
}
