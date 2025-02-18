import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  heroChatBubbleOvalLeftEllipsis,
  heroDocumentArrowDown,
  heroEnvelope,
  heroIdentification,
  heroNumberedList,
} from '@ng-icons/heroicons/outline';
import { SingleLink } from '../../interfaces/single-link.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-start-link',
  imports: [NgIcon, RouterLink, TitleCasePipe],
  templateUrl: './start-link.component.html',
  styles: ``,
  providers: [
    provideIcons({
      heroEnvelope,
      heroIdentification,
      heroChatBubbleOvalLeftEllipsis,
      heroDocumentArrowDown,
      heroNumberedList,
    }),
  ],
})
export class StartLinkComponent {
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
    icon: '',
    isVisible: false,
  };

  get getLink(): SingleLink {
    return this._link;
  }
}
