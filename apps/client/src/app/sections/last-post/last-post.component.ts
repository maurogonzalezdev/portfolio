import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';

import { Breakpoint } from '@client/app/shared/types';
import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { LastPost } from '@client/app/sections/interfaces';

@Component({
  selector: 'section-last-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-post.component.html',
  styleUrl: './last-post.component.css',
})
export class LastPostComponent implements OnInit {
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

  public getArticleStyle() {
    return {
      backgroundImage: `url(${this._lastPost.image})`,
    };
  }
}
