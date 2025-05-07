import { SkillType } from '@client/app/sections/types';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  description: string;
  type: SkillType;
}
