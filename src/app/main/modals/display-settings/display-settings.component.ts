import {Component, OnDestroy, OnInit} from '@angular/core';
import {SETTINGS_NAME} from '../../shared/constants/constants';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';
import {Store} from '@ngrx/store';
import {HIDE_TOOLBAR_BUTTON, SHOW_TOOLBAR_BUTTON} from '../../redux/menu/menu.actions';
import {Subject} from 'rxjs';
import {selectButtons} from '../../redux/menu/menu.selectors';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss']
})
export class DisplaySettingsComponent implements OnInit, OnDestroy {

  innerSettings: MenuButtonModel[];
  subject$ = new Subject();

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectButtons)
      .pipe(takeUntil(this.subject$))
      .subscribe(data => this.innerSettings = data);
  }

  ngOnDestroy(): void {
    this.saveSettings();
    this.subject$.next();
    this.subject$.complete();
  }

  saveSettings(): void {
    localStorage.setItem(SETTINGS_NAME, JSON.stringify(this.innerSettings));
  }

  onOff($event, button: MenuButtonModel): void {
    if ($event.checked) {
      this.store.dispatch(SHOW_TOOLBAR_BUTTON({button}));
    } else {
      this.store.dispatch(HIDE_TOOLBAR_BUTTON({button}));
    }
  }

}
