import { SkillType } from '@client/app/features/sections/models/types';

export interface Skill {
  id: number;
  name: string;
  icon: string;
  description: string;
  type: SkillType;
}
