import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RibbonLayoutComponent } from '../ribbon-layout/ribbon-layout.component';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { AsyncPipe, NgStyle } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenuComponent } from '../../components/menu/menu.component';
import { MenuService } from '../../services/menu.service';
import { IsMobileService } from '../../services/is-mobile.service';
import { Observable, takeUntil } from 'rxjs';

@Component({
  selector: 'app-main-layout',
  imports: [
    RouterOutlet,
    RibbonLayoutComponent,
    MenuComponent,
    NavbarComponent,
    NgScrollbarModule,
    NgStyle,
  ],
  templateUrl: './main-layout.component.html',
  styles: `.margin-main{margin-left:304px;}`,
})
export class MainLayoutComponent implements OnInit {
  private _menuService = inject(MenuService);
  private _isMobileService = inject(IsMobileService);

  private _isMenuVisible: boolean = true;
  private _isMobile: boolean = false;

  constructor() {
    this._isMobileService.isMobile$.subscribe((isMobile) => {
      this._isMobile = !isMobile;
    });
  }

  ngOnInit(): void {
    this._menuService.getMenuIsVisible().subscribe((data: boolean) => {
      this._isMenuVisible = data;
    });
  }

  public mainStyle() {
    return this._isMenuVisible ? '304px' : '48px';
  }

  get getIsMobile(): boolean {
    return this._isMobile;
  }
}
