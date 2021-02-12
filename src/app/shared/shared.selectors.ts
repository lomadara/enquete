import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.reducer';

export const selectSharedState = createFeatureSelector<SharedState>('shared');

export const selectLoading = createSelector(
  selectSharedState,
  state => state.showLoading
);
