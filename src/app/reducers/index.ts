import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { SharedState, reducer as sharedReducer } from '../shared/shared.reducer'

export interface AppState {
    shared: SharedState;
}

export const reducers: ActionReducerMap<AppState> = {
    shared: sharedReducer
};


export const metaReducers: MetaReducer<AppState>[] = [];
