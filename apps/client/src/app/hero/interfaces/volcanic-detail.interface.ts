import { VolcanicFlow, VolcanicVent } from '@client/app/hero/interfaces';

export interface VolcanicDetail {
  vents: VolcanicVent[];
  flows: VolcanicFlow[];
  lavaColor: string;
}
