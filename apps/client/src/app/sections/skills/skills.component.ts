import { Component, inject } from '@angular/core';

import { BreakpointObserverService } from '@client/app/shared/services/breakpoint-observer.service';
import { CaptionComponent } from '@client/app/shared/caption/caption.component';
import { Skill, Skills } from '@client/app/sections/interfaces';
import { SkillComponent } from '@client/app/sections/skill/skill.component';
import { SkillsService } from '@client/app/sections/services/skills.service';
import { TitleComponent } from '@client/app/shared/title/title.component';

import { heroRocketLaunchSolid } from '@ng-icons/heroicons/solid';

@Component({
  selector: 'section-skills',
  standalone: true,
  imports: [TitleComponent, SkillComponent, CaptionComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  private readonly _skillsService: SkillsService = inject(SkillsService);
  private readonly _breakpointObserverService: BreakpointObserverService =
    inject(BreakpointObserverService);

  private _isSmallScreen: boolean = false;
  private _skillsIcon: string = heroRocketLaunchSolid;

  constructor() {
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

  public getTechnicalSkills(): Skill[] {
    return this._skillsService.getTechnicalSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
  public getSoftSkills(): Skill[] {
    return this._skillsService.getSoftSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
  public getGeneralSkills(): Skill[] {
    return this._skillsService.getGeneralSkills.map((skills: Skills) => {
      const key = Object.keys(skills)[0];
      return skills[key];
    });
  }
}
