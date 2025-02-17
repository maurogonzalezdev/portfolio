import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title',
  imports: [],
  templateUrl: './title.component.html',
  styles: ``,
})
export class TitleComponent {
  @Input()
  set setTitle(title: string) {
    if (!title) {
      return;
    }

    this._title = title;
  }

  @Input()
  set setSubtitle(subtitle: string) {
    if (!subtitle) {
      return;
    }

    this._subtitle = subtitle;
  }

  private _title: string = '';

  private _subtitle: string = '';

  get getTitle(): string {
    return this._title;
  }

  get getSubtitle(): string {
    return this._subtitle;
  }
}
