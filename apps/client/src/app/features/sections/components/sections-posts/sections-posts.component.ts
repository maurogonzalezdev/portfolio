import { Component } from '@angular/core';

import { LastPost } from '@client/app/features/sections/models/interfaces';
import { SectionsLastPostComponent } from '@client/app/features/sections/components/sections-last-post/sections-last-post.component';
import { SectionsTitleComponent } from '@client/app/features/sections/components/sections-title/sections-title.component';

import { heroDocumentTextSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'sections-posts',
  standalone: true,
  imports: [SectionsTitleComponent, SectionsLastPostComponent],
  templateUrl: './sections-posts.component.html',
  styleUrl: './sections-posts.component.css',
})
export class SectionsPostsComponent {
  private _lastPostsIcon: string = heroDocumentTextSolid;
  // This is a mock data, in a real application this data should be fetched from an API or a service
  private _lastPosts: LastPost[] = [
    {
      id: 1,
      title: 'Test 1',
      description:
        'This is a test Description... This is a test Description...',
      tags: ['cats', 'cute', 'blog'],
      image:
        'https://ik.imagekit.io/maurogonzalezdev/portfolio/tr:q-90/tr:w-1650/hero-1536w_EmSp_MFVC.webp',
      creationDate: new Date().toLocaleDateString(),
    },
    {
      id: 2,
      title: 'Testing a very large title from blog posts',
      description:
        'This asdas sadasdd23d 32 asda 23. This asdas sadasdd23d 32 asda 23.',
      tags: ['cats', 'cute', 'blog'],
      image:
        'https://ik.imagekit.io/maurogonzalezdev/portfolio/tr:q-90/tr:w-1650/hero-1536w_EmSp_MFVC.webp',
      creationDate: new Date().toLocaleDateString(),
    },
    {
      id: 3,
      title: 'f34¨ñ+ skjfnds dfs a12_s sdkjfnds fds[asdad] gdfg! #" (asdads)',
      description: 'Tasd[/&8] 8] 4f34b +´}- 4f34b +´}-',
      tags: ['cats', 'cute', 'blog'],
      image:
        'https://ik.imagekit.io/maurogonzalezdev/portfolio/tr:q-90/tr:w-1650/hero-1536w_EmSp_MFVC.webp',
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
