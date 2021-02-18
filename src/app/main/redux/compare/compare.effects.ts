import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import {TabModel} from '../../shared/domains/tab.model';
import {selectTabs} from '../tabs/tabs.selector';
import {REMOVE_TAB, REMOVE_TABBAR, SPLIT_TAB, TRANSFER_TABBAR} from '../tabs/tabs.actions';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CompareEffects {

  private bars: TabModel[] = [];

  constructor(private actions$: Actions,
              private store: Store) {
    this.store.select(selectTabs).subscribe(data => this.bars = data);
  }

  splitEffect$ = createEffect(() => this.actions$.pipe(
    ofType(SPLIT_TAB),
    map(tabs => ({type: '[SPLIT_COMPARE]', payload: this.bars})),
    catchError(() => of({type: '[EFFECT_ERROR_COMPARE]'}))
  ));

  compareEffect$ = createEffect(() => this.actions$.pipe(
    ofType(REMOVE_TABBAR, TRANSFER_TABBAR, REMOVE_TAB),
    map(tabs => ({type: '[REMOVE_FROM_COMPARE]', payload: this.bars})),
    catchError(() => of({type: '[EFFECT_ERROR_COMPARE]'}))
  ));

}
