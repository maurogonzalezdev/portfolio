import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { environment } from '@client/environments/environment';
import { Log } from '@client/app/shared/types';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private readonly _platformId: Object = inject(PLATFORM_ID);

  private _infoColor: string = '#61ADE3';
  private _warnColor: string = '#E3C061';
  private _errorColor: string = '#E36161';

  public log(type: Log, message: string): void {
    if (
      isPlatformServer(this._platformId) ||
      !environment.enableDetailedLogging
    ) {
      return;
    }

    const timestamp: string = new Date().toISOString();
    const logMessage: string = `[${timestamp}] [${type}] ${message}`;

    switch (type) {
      case 'info':
        console.info(`%c ${logMessage}`, `color:${this._infoColor}`);
        break;
      case 'warn':
        console.warn(`%c ${logMessage}`, `color:${this._warnColor}`);
        break;
      case 'error':
        console.error(`%c ${logMessage}`, `color:${this._errorColor}`);
        break;
      case 'table':
        console.table(logMessage);
        break;
      default:
        console.log(logMessage);
    }

    return;
  }
}
