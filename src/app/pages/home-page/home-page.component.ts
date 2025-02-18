import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { StartLinksComponent } from "../../components/start-links/start-links.component";
import { RecentLinksComponent } from '../../components/recent-links/recent-links.component';

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent, StartLinksComponent, RecentLinksComponent],
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
