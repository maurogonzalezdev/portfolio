import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private _menuIsVisible: BehaviorSubject<boolean> = new BehaviorSubject(true);

  public getMenuIsVisible(): Observable<boolean> {
    return this._menuIsVisible;
  }

  set setMenuIsVisible(status: boolean) {
    this._emitNewStatus(status);
  }

  private _emitNewStatus(status: boolean): void {
    this._menuIsVisible.next(status);
  }

  constructor() {}
}
