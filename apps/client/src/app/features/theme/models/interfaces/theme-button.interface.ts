import { Theme } from '@client/app/features/theme/models/types';

export interface ThemeButton {
  id: number;
  name: Theme;
  colorPrimary: string;
  colorSecondary: string;
  isActive: boolean;
}
