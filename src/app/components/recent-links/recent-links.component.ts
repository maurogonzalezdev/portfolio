import { Component, Input } from '@angular/core';
import { SingleLink } from '../../interfaces/single-link.interface';
import { RecentLinkComponent } from '../recent-link/recent-link.component';

@Component({
  selector: 'app-recent-links',
  imports: [RecentLinkComponent],
  templateUrl: './recent-links.component.html',
  styles: ``,
})
export class RecentLinksComponent {
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
      isVisible: true,
    },
    {
      id: 2,
      name: 'resume',
      url: '/resume',
      isVisible: true,
    },
    {
      id: 3,
      name: 'blog',
      url: '/blog',
      isVisible: true,
    },
    {
      id: 4,
      name: 'some-stunning-project',
      url: '/some-stunning-project',
      isVisible: true,
    },
    {
      id: 5,
      name: 'skills',
      url: '/skills',
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
