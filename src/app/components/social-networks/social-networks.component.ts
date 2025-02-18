import { Component } from '@angular/core';
import { SingleLink } from '../../interfaces/single-link.interface';
import { SocialNetworkComponent } from "../social-network/social-network.component";

@Component({
  selector: 'app-social-networks',
  imports: [SocialNetworkComponent],
  templateUrl: './social-networks.component.html',
  styles: ``,
})
export class SocialNetworksComponent {
  private _socialNetworks: SingleLink[] = [
    {
      id: 1,
      name: 'GitHub',
      url: 'https://github.com/maurogonzalezdev',
      icon: '',
      isVisible: true,
    },
    {
      id: 2,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/mauriciogcabrera/',
      icon: '',
      isVisible: true,
    },
    {
      id: 3,
      name: 'X',
      url: 'https://x.com/MauGonzalezDev',
      icon: '',
      isVisible: true,
    },
    {
      id: 4,
      name: 'Blog',
      url: 'https://mauro-gonzalez.dev/blog',
      icon: '',
      isVisible: true,
    },
    {
      id: 5,
      name: 'Medium',
      url: 'https://medium.com/@mauro_gonzalez_dev',
      icon: '',
      isVisible: true,
    },
  ];

  get getSocialNetworks(): SingleLink[] {
    return this._socialNetworks;
  }
}
