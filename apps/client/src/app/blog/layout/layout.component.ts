import { AfterViewInit, Component, inject } from '@angular/core';
import { ThemeSwitcherService } from '@client/app/shared/services/theme-switcher.service';

@Component({
  selector: 'blog-layout',
  standalone: true,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent implements AfterViewInit {
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);

  ngAfterViewInit(): void {
    this._themeSwitcherService.removeLoader();
  }
}
