import { RpsService } from "../../services/rps.service";
import { RpsEffects } from "./rps.effect";
import { TestBed } from "@angular/core/testing";
import { Actions } from "@ngrx/effects";
import { ScannedActionsSubject } from "@ngrx/store";
import { IAdvancedMove, IResult } from "src/app/model/rps-model";
import { Observable } from "rxjs/internal/Observable";
import { of } from "rxjs/internal/observable/of";
import { cold } from 'jasmine-marbles';
import {AdvancedPlayAction, AdvancedPlaySuccessAction, AdvancedPlayFailAction, PlayFailAction, PlayAction, PlaySuccessAction } from '../actions/rps.action';

describe('RpsEffects', ()=>{
    let rpsService: jasmine.SpyObj<RpsService>;

    beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RpsEffects,
        Actions,
        ScannedActionsSubject,
        {
          provide: RpsService,
          useValue: jasmine.createSpyObj('rpsService', ['getWinner','getAdvanceWinner'])
        }
      ]
    }));

    beforeEach(() => {
        rpsService = TestBed.get(RpsService);
      });

    describe('loadRps$', ()=>{
        it('should return a PLAY_SUCCESS action, on success', () => {
            const payload : number = 1;
            const serviceResponse: IResult = {
                userMove: 1,
                pcMove: 3,
                score: 2
              };
      
            rpsService.getWinner.and.returnValue(of(serviceResponse));

            const actions: Observable<any> = cold('a', {
              a: new PlayAction(payload)
            });
      
            const effects = new RpsEffects(rpsService, new Actions(actions));

            const expected = cold('b', {
              b: new PlaySuccessAction(serviceResponse)
            });
      
            expect(effects.loadRps$).toBeObservable(expected);
          });
    });

    describe('loadAdvancedRps$', ()=>{
        it('should return ADVANCED_PLAY_SUCCESS, on success', ()=>{
            const payload : IAdvancedMove = {userNewMove: 2, userMoves:[1]};

            const serviceResponse: IResult = {
                userMove: 1,
                pcMove: 3,
                score: 2
              };

            rpsService.getAdvanceWinner.and.returnValue(of(serviceResponse));

            const actions: Observable<any> = cold('a', {
                a: new AdvancedPlayAction(payload)
              });

              const effects = new RpsEffects(rpsService, new Actions(actions));

              const expected = cold('b', {
                b: new AdvancedPlaySuccessAction(serviceResponse)
              });

              expect(effects.loadAdvancedRps$).toBeObservable(expected);
        });

    });
});