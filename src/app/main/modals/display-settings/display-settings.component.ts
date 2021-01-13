import {Component, OnDestroy, OnInit} from '@angular/core';
import {SETTINGS_NAME} from '../../shared/constants/constants';
import {MenuButtonModel} from '../../shared/domains/menu-button.model';
import {Store} from '@ngrx/store';
import {HIDE_TOOLBAR_BUTTON, SHOW_TOOLBAR_BUTTON} from '../../redux/menu/buttons.actions';
import {Subject} from 'rxjs';
import {selectButtons} from '../../redux/menu/buttons.selectors';
import {map, takeUntil} from 'rxjs/operators';
import {selectBookmarks} from '../../redux/bookmarks/host.selector';
import {Bookmark} from '../../shared/domains/bookmarks.model';
import {REMOVE_BOOKMARK} from '../../redux/bookmarks/host.actions';


@Component({
  selector: 'app-display-settings',
  templateUrl: './display-settings.component.html',
  styleUrls: ['./display-settings.component.scss']
})
export class DisplaySettingsComponent implements OnInit, OnDestroy {

  innerSettings: MenuButtonModel[];
  bookmarks: Bookmark [];
  subject$ = new Subject();
  delete = 'delete';

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.select(selectButtons)
      .pipe(takeUntil(this.subject$))
      .subscribe(data => this.innerSettings = data);
    this.store.select(selectBookmarks)
      .pipe(takeUntil(this.subject$),
        map((data) => {
          const bookmarks: Bookmark[] = [];
          data.forEach((elem) => bookmarks.push({host: elem, button: false}));
          return bookmarks;
        }))
      .subscribe(data => this.bookmarks = data);
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

  deleteBookmark(index: number): void {
    this.store.dispatch(REMOVE_BOOKMARK({index}));
  }
}
