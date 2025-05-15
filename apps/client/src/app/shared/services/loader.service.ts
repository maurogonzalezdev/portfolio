import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _isLoaderVisible: boolean = true;

  get getIsLoaderVisible(): boolean {
    return this._isLoaderVisible;
  }

  public setLoaderVisible(isVisible: boolean): void {
    this._isLoaderVisible = isVisible;
  }
}
