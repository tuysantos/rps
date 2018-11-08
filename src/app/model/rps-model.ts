import { NodeCompatibleEventEmitter } from "rxjs/internal/observable/fromEvent";

export interface IResult {
    userMove: number;
    pcMove: number;
    score: number;
}

export interface IAdvancedMove {
    userNewMove: number;
    userMoves: any[];
}