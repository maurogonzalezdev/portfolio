import { Component } from '@angular/core';

import { LastPost } from '@client/app/sections/interfaces';
import { LastPostComponent } from '@client/app/sections/last-post/last-post.component';
import { TitleComponent } from '@client/app/shared/title/title.component';

import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'section-last-posts',
  standalone: true,
  imports: [TitleComponent, LastPostComponent],
  templateUrl: './last-posts.component.html',
  styleUrl: './last-posts.component.css',
})
export class LastPostsComponent {
  private _lastPostsIcon: string = heroDocumentTextSolid;
  private _lastPosts: LastPost[] = [
    {
      id: 1,
      title: 'Test 1',
      description:
        'This is a test Description... This is a test Description...',
      tags: ['cats', 'cute', 'blog'],
      image: '/images/cat.jpg',
      creationDate: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: 'Testing a very large title from blog posts',
      description:
        'This asdas sadasdd23d 32 asda 23. This asdas sadasdd23d 32 asda 23.',
      tags: ['cats', 'cute', 'blog'],
      image: '/images/cat.jpg',
      creationDate: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: 'f34¨ñ+ skjfnds dfs a12_s sdkjfnds fds[asdad] gdfg! #" (asdads)',
      description: 'Tasd[/&8] 8] 4f34b +´}- 4f34b +´}-',
      tags: ['cats', 'cute', 'blog'],
      image: '/images/cat.jpg',
      creationDate: new Date().toLocaleDateString(),
    },
  ];

  get getLastPostsIcon(): string {
    return this._lastPostsIcon;
  }
  get getLastPosts(): LastPost[] {
    return this._lastPosts;
  }
}
