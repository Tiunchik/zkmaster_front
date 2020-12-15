import {Component, OnDestroy, OnInit} from '@angular/core';
import {SETTINGS_NAME} from '../../shared/constants/constants';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss']
})
export class DisplaySettingsComponent implements OnInit, OnDestroy {

  innerSettings: MenuButtonModel[];

  constructor() {
  }

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

  /**
   * Попробовал сделать как в примерах, у меня какая то фигня - я делаю апдейт параметра через SHOW/HIDE, а он мне
   * говорит что это невозможно, так как я пытаюсь изменить значение которое уже есть в store.
   * То есть, в store можно только добавить новый элемент, но нельзя изменить уже имеющийся
   *
   * В примерах они используют просто counter, его можно увеличить или уменьшить но внутрянку же не поменяешь
   */
  saveSettings(): void {
    localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.innerSettings));
  }
}
