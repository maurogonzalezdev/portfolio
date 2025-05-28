import { PlanetDetails } from '@client/app/features/hero/models/interfaces';

export interface Planet {
  id: number;
  name: string;
  details: PlanetDetails;
}
