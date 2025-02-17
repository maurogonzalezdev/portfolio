import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';


@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
  styles: ``,
})
export class HomePageComponent {
  private _title: string = 'Mauricio González';
  private _subtitle: string = 'Professional Web Developer';

  get getTitle(): string {
    return this._title;
  }

  get getSubtitle(): string {
    return this._subtitle;
  }
}
