import { Component, inject, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu',
  imports: [],
  templateUrl: './menu.component.html',
  styles: ``
})
export class MenuComponent implements OnInit{
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

  set setIsNavBarVisible(status: boolean) {
   this._menuService.setMenuIsVisible = status;
    return;
  }

}
