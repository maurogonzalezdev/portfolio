import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

import { environment } from '@client/environments/environment';
import { Log } from '@client/app/core/models/types';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  private readonly _platformId: Object = inject(PLATFORM_ID);

  // Define colors for different log types
  private _infoColor: string = '#61ADE3';
  private _warnColor: string = '#E3C061';
  private _errorColor: string = '#E36161';

  /**
   * Logs a message to the console with a timestamp and type.
   * @param {Log} type - The type of log (info, warn, error, table).
   * @param {string} message - The message to log.
   * @returns {void}
   * @description This method logs messages to the console with a timestamp and type.
   */
  public log(type: Log, message: string): void {
    if (
      isPlatformServer(this._platformId) ||
      !environment.enableDetailedLogging
    ) {
      return;
    }

    const timestamp: string = new Date().toISOString();
    const logMessage: string = `[${timestamp}] [${type}] ${message}`;

    // Log the message to the console with appropriate styling based on type
    switch (type) {
      case 'info':
        console.info(`%cℹ️ ${logMessage}`, `color:${this._infoColor}`);
        break;
      case 'warn':
        console.warn(`%c⚠️ ${logMessage}`, `color:${this._warnColor}`);
        break;
      case 'error':
        console.error(`%c💀 ${logMessage}`, `color:${this._errorColor}`);
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
