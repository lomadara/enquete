import { SharedActions, SharedActionTypes } from './shared.actions';

export interface SharedState {
  showLoading: boolean;
}

export const initialState: SharedState = {
  showLoading: false,
};

export function reducer(state = initialState, action: SharedActions): SharedState {
  switch (action.type) {
    case SharedActionTypes.ShowLoading:
      return { ...state, showLoading: true };
    case SharedActionTypes.HideLoading:
      return { ...state, showLoading: false };
    default:
      return state;
  }
}
