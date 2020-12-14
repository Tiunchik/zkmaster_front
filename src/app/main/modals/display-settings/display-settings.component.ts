import {Component, OnDestroy, OnInit} from '@angular/core';
import {SETTINGS_NAME} from '../../shared/constants/constants';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';
import {MainPageComponent} from '../../main-page/main-page.component';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss']
})
export class DisplaySettingsComponent implements OnInit, OnDestroy {

  innerSettings: MenuButtonModel[];

  constructor() {}

  ngOnInit(): void {
    this.loadSettings();
  }

  ngOnDestroy(): void {
    this.saveSettings();
  }

  loadSettings(): void {
    const storedButtons = localStorage.getItem(SETTINGS_NAME);
    if (storedButtons) {
      this.innerSettings = JSON.parse(localStorage.getItem(SETTINGS_NAME));
    }
  }

  saveSettings(): void {
    localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.innerSettings));
  }
}
