import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {ADD_TAB, CHOOSE_TAB, MOVE_TABBAR, REMOVE_TAB, REMOVE_TABBAR, SPLIT_TAB, TRANSFER_TABBAR} from '../tabs/tabs.actions';
import {catchError, map} from 'rxjs/operators';
import {of} from 'rxjs';

@Injectable()
export class CompareEffects {

  constructor(private actions$: Actions) {}

  compareEffect$ = createEffect(() => this.actions$.pipe(
    ofType(ADD_TAB, REMOVE_TAB, SPLIT_TAB, REMOVE_TABBAR, MOVE_TABBAR, TRANSFER_TABBAR, ),
    map(tabs => ({type: '[STOP_COMPARE]'})),
    catchError(() => of({type: '[STOP_COMPARE]'}))
  ));

}
