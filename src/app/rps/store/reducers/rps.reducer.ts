import {IResult} from '../../../model/rps-model';
import {RpsActions, RpsActionTypes} from '../actions/rps.action';

export interface RpsState {
    error: Error;
    result: IResult;
    currentPlay: number;
    userMoves: any[];
}

export const initialState: RpsState = {
    error: null,
    result: null,
    currentPlay: 0,
    userMoves: []
}

function addMove(move: number, list: any[]): any[] {
    list[list.length] = move;
    return list;
}

export function reducer(state = initialState, action: RpsActions): RpsState{
    switch(action.type){
        case RpsActionTypes.PLAY:
            return {
                ...state,
                currentPlay: action.payload,
                error: null
            }

        case RpsActionTypes.PLAY_SUCCESS:
            return {
                ...state,
                currentPlay: action.payload.userMove,
                result: action.payload
            }

        case RpsActionTypes.PLAY_FAIL:
            return {
                ...state,
                error : action.error
            }

        case RpsActionTypes.ADVANCED_PLAY:
            return {
                ...state,
                currentPlay: action.payload.userNewMove
            }

        case RpsActionTypes.ADVANCED_PLAY_SUCCESS:
            return {
                ...state,
                result: action.payload,
                userMoves: addMove(state.currentPlay, state.userMoves)
            }

        case RpsActionTypes.ADVANCED_PLAY_FAIL:
            return {
                ...state,
                error : action.error
            }

        case RpsActionTypes.RESET_GAME:
            return {
                error: null,
                result: null,
                currentPlay: null,
                userMoves: null
            }

        default:
            return state;
    }
}