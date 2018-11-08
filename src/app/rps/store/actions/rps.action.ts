import { Action } from '@ngrx/store';
import { IResult, IAdvancedMove } from 'src/app/model/rps-model';

export enum RpsActionTypes {
    PLAY = '[RPS] play the game ',
    PLAY_SUCCESS = '[RPS SERVICE] Pay Success',
    PLAY_FAIL = '[RPS SERVICE] Play Fail',
    RESET_GAME = '[RPS] Reset the game ',
    ADVANCED_PLAY = '[RPS] Advanced play the game ',
    ADVANCED_PLAY_SUCCESS = '[RPS SERVICE] Avanced Pay Success',
    ADVANCED_PLAY_FAIL = '[RPS SERVICE] Advanced Play Fail',
}

export class PlayAction implements Action {
    readonly type = RpsActionTypes.PLAY;
    constructor(public payload : number){}
}

export class PlaySuccessAction implements Action {
    readonly type = RpsActionTypes.PLAY_SUCCESS;
    constructor(public payload : IResult){}
}

export class PlayFailAction implements Action {
    readonly type = RpsActionTypes.PLAY_FAIL;
    constructor(public error : Error){}
}

export class ResetPlayAction implements Action {
    readonly type = RpsActionTypes.RESET_GAME;
    constructor(){}
}

export class AdvancedPlayAction implements Action {
    readonly type = RpsActionTypes.ADVANCED_PLAY;
    constructor(public payload : IAdvancedMove){}
}

export class AdvancedPlaySuccessAction implements Action {
    readonly type = RpsActionTypes.ADVANCED_PLAY_SUCCESS;
    constructor(public payload : IResult){}
}

export class AdvancedPlayFailAction implements Action {
    readonly type = RpsActionTypes.ADVANCED_PLAY_FAIL;
    constructor(public error : Error){}
}

export type RpsActions = PlayAction
    | PlaySuccessAction
    | PlayFailAction
    | AdvancedPlayAction
    | AdvancedPlaySuccessAction
    | AdvancedPlayFailAction
    | ResetPlayAction;