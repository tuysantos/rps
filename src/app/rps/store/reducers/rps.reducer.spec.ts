
import {reducer} from './rps.reducer';
import * as fromReducers from './rps.reducer';
import {AdvancedPlaySuccessAction, AdvancedPlayFailAction, PlayAction, PlaySuccessAction, ResetPlayAction } from '../actions/rps.action';
import { IResult } from 'src/app/model/rps-model';

let rpsState: fromReducers.RpsState;

describe('RpsReducer', ()=>{
    beforeEach(() => {
        rpsState = {
            error: null,
            result: null,
            currentPlay: null,
            userMoves: null
            }
    });

    describe('undefined action', () => {
        it('should return the default state', () => {
            const action = {} as any;
            const result = reducer(undefined, action);
            expect(result).toEqual(fromReducers.initialState);
        });
    });

    describe('PLAY action', () => {
        it('should clear any previous errors', () => {
            const payload : number = 1;
            const action = new PlayAction(payload);

            const prevState = {
                ...rpsState,
                error: { message: 'xxx', name: 'xxx'}
                    };

            const result = reducer(prevState, action);

            expect(result).toEqual({
                ...rpsState,
                currentPlay: action.payload
            });
        });
    });

    describe('PLAY_SUCCESS action', () => {
        it('should clear any previous errors', () => {
            const payload : IResult = {userMove: 1, pcMove: 3, score:1};
            const action = new PlaySuccessAction(payload);

            const prevState = {
                ...rpsState,
                        error: null,
                        currentPlay: 1,
                        result: null
                    };

            const result = reducer(prevState, action);

            expect(result).toEqual({
                ...rpsState,
                result: action.payload,
                currentPlay: prevState.currentPlay
            });
        });
    });

    describe('ADVANCED_PLAY_SUCCESS action', () => {
        it('should return array with 1 userMove', () => {
            const payload : IResult = {userMove: 2, pcMove: 3, score:2};
            const action = new AdvancedPlaySuccessAction(payload);

            const prevState = {
                ...rpsState,
                        error: null,
                        currentPlay: 2,
                        result: null,
                        userMoves:[]
                    };

            const result = reducer(prevState, action);
            expect(result.result).toEqual(payload);
            expect(result.userMoves.length).toEqual(1);
            expect(result.userMoves[0]).toEqual(2);
        });
    });

    describe('ADVANCED_PLAY_FAIL action', () => {
        it('should return array with 1 userMove', () => {
            const err : Error = {message:'xxx', name: 'xxx'};
            const action = new AdvancedPlayFailAction(err);

            const prevState = {
                ...rpsState,
                        error: null,
                        currentPlay: 1,
                        result: null,
                        userMoves:[]
                    };

            const result = reducer(prevState, action);
            expect(result.error).not.toEqual(null);
        });
    });

    describe('RESET_GAME action', () => {
        it('should return initial state', () => {
            const action = new ResetPlayAction();

            const prevState = {
                ...rpsState,
                        error: null,
                        currentPlay: 1,
                        result: {userMove: 2, pcMove: 3, score:2},
                        userMoves:[1,1,2,3,1]
                    };

            const result = reducer(prevState, action);
            expect(result).toEqual(rpsState);
        });
    });
});