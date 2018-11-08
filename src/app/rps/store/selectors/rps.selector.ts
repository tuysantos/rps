import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromRps from '../reducers/rps.reducer';

const getRpsFeatureState = createFeatureSelector<fromRps.RpsState>('rps');

export const getResult = createSelector(
    getRpsFeatureState, state => state.result
);

export const getError = createSelector(
    getRpsFeatureState, state => state.error
);

export const getCurrentPlay = createSelector(
    getRpsFeatureState, state => state.currentPlay
);

export const getAdvancedResult = createSelector(
    getRpsFeatureState, state => state.result
);

export const getCurrentState = createSelector(
    getRpsFeatureState, state => state
);