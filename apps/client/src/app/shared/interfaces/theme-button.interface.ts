import { Theme } from '@client/app/shared/types';

export interface ThemeButton {
  id: number;
  name: Theme;
  colorPrimary: string;
  colorSecondary: string;
  isActive: boolean;
}
