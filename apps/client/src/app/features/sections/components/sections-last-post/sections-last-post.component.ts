import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/core/models/types';
import { BreakpointObserverService } from '@client/app/core/services';
import { LastPost } from '@client/app/features/sections/models/interfaces';

@Component({
  selector: 'sections-last-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sections-last-post.component.html',
  styleUrl: './sections-last-post.component.css',
})
export class SectionsLastPostComponent implements OnInit {
  @Input({ required: true })
  set setLastPost(lastPost: LastPost) {
    if (!lastPost) return;

    this._lastPost = lastPost;
    return;
  }

  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _breakpoint: Breakpoint = 'sm';
  private _lastPost: LastPost = {
    id: 0,
    title: '',
    description: '',
    tags: [],
    image: '',
    creationDate: '',
  };

  ngOnInit(): void {
    this._breakpointObserverService
      .getBreakpoint$()
      .subscribe((breakpoint: Breakpoint) => {
        this._breakpoint = breakpoint;
      });
  }

  get getLastPost(): LastPost {
    return this._lastPost;
  }
  get getBreakpoint(): Breakpoint {
    return this._breakpoint;
  }

  // This method returns the style for the article element based on the last post's image
  public getArticleStyle() {
    return {
      backgroundImage: `url(${this._lastPost.image})`,
    };
  }
}
