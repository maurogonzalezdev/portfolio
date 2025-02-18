import { Component, Input } from '@angular/core';
import { SingleLink } from '../../interfaces/single-link.interface';
import { StartLinkComponent } from '../start-link/start-link.component';

@Component({
  selector: 'app-start-links',
  imports: [StartLinkComponent],
  templateUrl: './start-links.component.html',
  providers: [],
  styles: ``,
})
export class StartLinksComponent {
  @Input()
  set setTitle(title: string) {
    if (!title) {
      return;
    }

    this._title = title;
  }

  private _title: string = '';

  private _links: SingleLink[] = [
    {
      id: 1,
      name: 'contact',
      url: '/contact',
      icon: 'heroEnvelope',
      isVisible: true,
    },
    {
      id: 2,
      name: 'resume',
      url: '/resume',
      icon: 'heroDocumentArrowDown',
      isVisible: true,
    },
    {
      id: 3,
      name: 'blog',
      url: '/blog',
      icon: 'heroChatBubbleOvalLeftEllipsis',
      isVisible: true,
    },
    {
      id: 4,
      name: 'about',
      url: '/about',
      icon: 'heroIdentification',
      isVisible: true,
    },
    {
      id: 5,
      name: 'skills',
      url: '/skills',
      icon: 'heroNumberedList',
      isVisible: true,
    },
  ];

  get getLinks(): SingleLink[] {
    return this._links;
  }

  get getTitle(): string {
    return this._title;
  }
}
