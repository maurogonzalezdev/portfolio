import { Component, Input } from '@angular/core';
import { SingleLink } from '../../interfaces/single-link.interface';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-recent-link',
  imports: [RouterLink, TitleCasePipe],
  templateUrl: './recent-link.component.html',
  styles: ``
})
export class RecentLinkComponent {
 @Input()
  set setLink(link: SingleLink) {
    if (!link) {
      return;
    }

    this._link = link;
  }

  private _link: SingleLink = {
    id: 0,
    name: '',
    url: '',
    isVisible: false,
  };

  get getLink(): SingleLink {
    return this._link;
  }
}
