import { Action } from '@ngrx/store';

export enum SharedActionTypes {
  ShowLoading = '[Shared] Show Loading',
  HideLoading = '[Shared] Hide Loading',
}

export class ShowLoading implements Action {
  readonly type = SharedActionTypes.ShowLoading;
}

export class HideLoading implements Action {
  readonly type = SharedActionTypes.HideLoading;
}

export type SharedActions = ShowLoading | HideLoading;
