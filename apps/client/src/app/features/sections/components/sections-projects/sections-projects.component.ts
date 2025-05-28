import { Component } from '@angular/core';

import { environment } from '@client/environments/environment';
import { SectionsTitleComponent } from '@client/app/features/sections/components/sections-title/sections-title.component';

import { heroCodeBracketSquareSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'sections-projects',
  standalone: true,
  imports: [SectionsTitleComponent],
  templateUrl: './sections-projects.component.html',
  styleUrl: './sections-projects.component.css',
})
export class SectionsProjectsComponent {
  private _projectsIcon: string = heroCodeBracketSquareSolid;

  get getProjectsIcon(): string {
    return this._projectsIcon;
  }
  get getGithubUrl(): string {
    return environment.githubUrl;
  }
}
