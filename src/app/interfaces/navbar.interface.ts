import { NavBarItem } from "./navbar-item.interface";

export interface NavBar{
  id: number;
  section: string;
  items: NavBarItem[];
  isVisible: boolean;
}
