import { Component } from '@angular/core';

import { TitleComponent } from '@client/app/shared/title/title.component';

import { heroCodeBracketSquareSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'section-projects',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})
export class ProjectsComponent {
  private _projectsIcon: string = heroCodeBracketSquareSolid;

  get getProjectsIcon(): string {
    return this._projectsIcon;
  }
}
