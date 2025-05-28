import { Component, Input } from '@angular/core';

import { SectionsSkillIconComponent } from '@client/app/features/sections/components/sections-skill-icon/sections-skill-icon.component';

@Component({
  selector: 'sections-skill',
  standalone: true,
  imports: [SectionsSkillIconComponent],
  templateUrl: './sections-skill.component.html',
})
export class SectionsSkillComponent {
  @Input({ required: true })
  set setSkillName(name: string) {
    if (!name) return;

    this._skillName = name;
    return;
  }
  @Input({ required: true })
  set setSkillIcon(icon: string) {
    if (!icon) return;

    this._skillIcon = icon;
  }
  @Input({ required: true })
  set setSkillDescription(description: string) {
    if (!description) return;

    this._skillDescription = description;
    return;
  }

  private _skillDescription: string = '';
  private _skillIcon: string = '';
  private _skillName: string = '';

  // Getters for Skill Properties
  get getSkillName(): string {
    return this._skillName;
  }
  get getSkillIcon(): string {
    return this._skillIcon;
  }
  get getSkillDescription(): string {
    return this._skillDescription;
  }
}
