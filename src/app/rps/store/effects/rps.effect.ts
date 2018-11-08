import { Injectable } from "@angular/core";
import { Effect, Actions } from "@ngrx/effects";
import { Observable, of  as observableOf} from "rxjs";
import {Action} from '@ngrx/store';
import { RpsService } from "../../services/rps.service";
import { RpsActionTypes } from "../actions/rps.action";
import { switchMap, map, catchError } from "rxjs/operators";
import * as RpsActions from '../actions/rps.action';
import { IResult } from "src/app/Model/rps-model";

@Injectable()
export class RpsEffects {
    @Effect()  loadRps$: Observable<Action>;
    @Effect()  loadAdvancedRps$: Observable<Action>;

    constructor(private rpsService: RpsService, private actions$: Actions){
        this.loadRps$ = this.actions$.ofType(RpsActionTypes.PLAY).pipe(
            switchMap((state: RpsActions.PlayAction) => 
                this.rpsService.getWinner(state.payload).pipe(
                    map((res: IResult) => new RpsActions.PlaySuccessAction(res)),
                    catchError((err: Error) => observableOf(new RpsActions.PlayFailAction(err)))
                )
            )
        );

        this.loadAdvancedRps$ = this.actions$.ofType(RpsActionTypes.ADVANCED_PLAY).pipe(
            switchMap((state: RpsActions.AdvancedPlayAction) => 
                this.rpsService.getAdvanceWinner(state.payload).pipe(
                    map((res: IResult) => new RpsActions.AdvancedPlaySuccessAction(res)),
                    catchError((err: Error) => observableOf(new RpsActions.AdvancedPlayFailAction(err)))
                )
            )
        );
    }
}