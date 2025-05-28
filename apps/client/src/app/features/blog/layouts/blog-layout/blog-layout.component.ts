import { AfterViewInit, Component, inject } from '@angular/core';

import { LoggingService } from '@client/app/core/services';
import { ThemeSwitcherService } from '@client/app/features/theme/services';

@Component({
  selector: 'blog-layout',
  standalone: true,
  templateUrl: './blog-layout.component.html',
  styleUrl: './blog-layout.component.css',
})
export class BlogLayoutComponent implements AfterViewInit {
  private readonly _themeSwitcherService: ThemeSwitcherService =
    inject(ThemeSwitcherService);
  private readonly _loggingService: LoggingService = inject(LoggingService);

  ngAfterViewInit(): void {
    this._themeSwitcherService.removeLoader();
    this._loggingService.log('info', 'Loader removed in BlogLayoutComponent');
  }
}
