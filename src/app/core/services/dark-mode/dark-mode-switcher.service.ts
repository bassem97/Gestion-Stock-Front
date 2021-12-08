import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DarkModeSwitcherService {
  private darkMode: boolean;
  constructor() { }

  setDarkMode(darkMode) {
    if (this.darkMode !== darkMode) {
      this.darkMode = darkMode;
    }
  }
  getDarkMode() {
    return this.darkMode;
  }
}
