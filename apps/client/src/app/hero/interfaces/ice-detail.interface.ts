import { IceCrack, IcePole } from '@client/app/hero/interfaces';

export interface IceDetail {
  cracks: IceCrack[];
  poles: IcePole[];
  iceColor: string;
}
