import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private _isLoading = signal<boolean>(false);
  isLoading = this._isLoading.asReadonly();

  private loadingTimeout: any;

  show() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }

    this.loadingTimeout = setTimeout(() => {
      this._isLoading.set(true);
    }, 250); 
  }

  hide() {
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
    }
    this._isLoading.set(false);
  }
}