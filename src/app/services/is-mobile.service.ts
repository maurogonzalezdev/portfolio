import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IsMobileService {
  private _isMobile = new BehaviorSubject<boolean>(this.checkIsMobile());
  public readonly isMobile$ = this._isMobile.asObservable();

  private checkIsMobile(): boolean {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  public setMobile(isMobile: boolean): void {
    this._isMobile.next(isMobile);
  }

  public updateMobileStatus(): void {
    this.setMobile(this.checkIsMobile());
  }
}
