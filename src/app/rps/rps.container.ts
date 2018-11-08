import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from '@ngrx/store';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import * as fromRps from './store/reducers/rps.reducer';
import * as rpsActions from './store/actions/rps.action';
import * as fromRpsState from './store/selectors/rps.selector';
import { IResult } from "../Model/rps-model";

@Component({
    selector: 'app-rps',
    templateUrl: './rps.container.html',
    styleUrls: ['./rps.container.scss']
  })
  export class RpsContainer implements OnDestroy, OnInit {
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    sub: Subscription;
    errorMessage: string;
    currentPlay: number;
    result: IResult = {userMove: -1, pcMove: -1, score: -1};
    gameResult: number = 0;
    newResult: number = 0;
    showIntro: boolean = true;
    welcomeMessage: string = 'Welcome to Rock Paper Scissors Game';
    playNewGame: boolean = false;
    isBasicPlayMode: boolean = true;
    playModes: any[] = ['Basic mode', 'Advanced mode'];
    playMode : string = 'Basic mode';
    userMoves : any[];

    constructor(private store: Store<fromRps.RpsState>) {
        this.playMode = (this.isBasicPlayMode)? 'Basic mode' : 'Advanced mode';
    }

    ngOnInit(){
        this.store.pipe(select(fromRpsState.getCurrentPlay))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (currentPlay: number) => {
                this.currentPlay = currentPlay;
            }
        );

        this.store.pipe(select(fromRpsState.getResult))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (result: IResult) => {
                    if(result){
                        this.result = result;
                        this.newResult = this.result.score;
                    }
                    
                }
            );

        this.store.pipe(select(fromRpsState.getAdvancedResult))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (result: IResult) => {
                    if(result){
                        this.result = result;
                        this.newResult = this.result.score;
                    }
                    
                }
            );

        this.store.pipe(select(fromRpsState.getCurrentState))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(state => {
                this.userMoves = state.userMoves;
            });

        this.store.pipe(select(fromRpsState.getError))
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
            (error : Error) => {
                if(error){
                alert('Error: ' + error.message);
                }
            }
        );
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    setPlayMode(mode: string): void {
        this.playMode = mode;
        this.isBasicPlayMode = (mode === 'Basic mode');
    }

    playGame(userAction: number): void {
        (this.isBasicPlayMode)? this.store.dispatch(new rpsActions.PlayAction(userAction)) : this.store.dispatch(new rpsActions.AdvancedPlayAction({userNewMove: userAction, userMoves: this.userMoves}));
        this.playNewGame = false; 
      }

    letsPay(): void{
        this.welcomeMessage = 'Rock Paper & Scissors Game';
        this.resetValues(false);
    }

    endGame():void {
        this.welcomeMessage = 'Welcome to Rock Paper Scissors Game';
        this.resetValues(true);
        this.store.dispatch(new rpsActions.ResetPlayAction());
        this.isBasicPlayMode = true;
        this.playMode = 'Basic mode';
        this.userMoves = [];
    }

    resetValues(flag: boolean): void {
        this.showIntro = flag;
        this.newResult = -1;
        this.playNewGame = true;
    }

    playAgain(): void {
        this.playNewGame = true;
        this.newResult = -2;
    }
  }