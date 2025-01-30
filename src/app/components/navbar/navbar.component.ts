import { Component, inject } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styles: ``
})
export class NavbarComponent {
  private _menuService = inject(MenuService);

  private _isNavBarVisible: boolean = true;

  ngOnInit(): void {
    this._menuService.getMenuIsVisible().subscribe(
      (data: boolean) => {
        this._isNavBarVisible = data
      }
    );
  }

  get getIsNavBarVisible(): boolean {
    return this._isNavBarVisible;
  }

}
