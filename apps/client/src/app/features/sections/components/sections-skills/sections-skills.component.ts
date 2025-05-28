import { Component, inject } from '@angular/core';

import {
  BreakpointObserverService,
  LoggingService,
} from '@client/app/core/services';
import { SectionsCaptionComponent } from '@client/app/features/sections/components/sections-caption/sections-caption.component';
import { SectionsSkillComponent } from '@client/app/features/sections/components/sections-skill/sections-skill.component';
import { SectionsTitleComponent } from '@client/app/features/sections/components/sections-title/sections-title.component';
import { Skill, Skills } from '@client/app/features/sections/models/interfaces';
import { SkillsService } from '@client/app/features/sections/services';

import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'sections-skills',
  standalone: true,
  imports: [
    SectionsTitleComponent,
    SectionsSkillComponent,
    SectionsCaptionComponent,
  ],
  templateUrl: './sections-skills.component.html',
  styleUrl: './sections-skills.component.css',
})
export class SectionsSkillsComponent {
  private readonly _loggingService: LoggingService = inject(LoggingService);
  private readonly _skillsService: SkillsService = inject(SkillsService);
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _isSmallScreen: boolean = false;
  private _skillsIcon: string = heroRocketLaunchSolid;

  constructor() {
    // Check is landscape
    this._breakpointObserverService
      .isSmallScreen$()
      .subscribe((isLandscape: boolean) => {
        this._isSmallScreen = isLandscape;
      });
  }

  get getSkillsIcon(): string {
    return this._skillsIcon;
  }
  get getIsSmallScreen(): boolean {
    return this._isSmallScreen;
  }

  // Fetch skills from the SkillsService
  public getTechnicalSkills(): Skill[] {
    this._loggingService.log('info', 'Fetching technical skills');
    return this._skillsService.getTechnicalSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
  // Fetch soft skills from the SkillsService
  public getSoftSkills(): Skill[] {
    this._loggingService.log('info', 'Fetching soft skills');
    return this._skillsService.getSoftSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
  // Fetch general skills from the SkillsService
  public getGeneralSkills(): Skill[] {
    this._loggingService.log('info', 'Fetching general skills');
    return this._skillsService.getGeneralSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
}
