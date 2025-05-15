import {
  ExoticDetail,
  GaseousDetails,
  IceDetail,
  RockyDetails,
  TerrestrialDetails,
  VolcanicDetail,
} from '@client/app/hero/interfaces';

export interface PlanetDetails {
  rocky?: RockyDetails;
  gaseous?: GaseousDetails;
  terrestrial?: TerrestrialDetails;
  ice?: IceDetail;
  volcanic?: VolcanicDetail;
  exotic?: ExoticDetail;
}
