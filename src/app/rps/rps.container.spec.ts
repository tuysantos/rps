import { RpsContainer } from "./rps.container";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Store, StoreModule, select } from "@ngrx/store";
import * as fromRpsReducer from './store/reducers/rps.reducer';
import { IResult } from "../model/rps-model";
import { EffectsModule } from "@ngrx/effects";
import { RpsService } from "./services/rps.service";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { PlayDetailComponent } from "./components/play-detail/play-detail.component";
import { UserActionComponent } from "./components/user-action/user-action.component";
import { GameScoreComponent } from "./components/game-score/game-score.component";
import { AboutComponent } from "./components/about/about.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import * as fromRpsState from './store/selectors/rps.selector';
import { RpsState } from "./store/reducers/rps.reducer";
import * as actions from './store/actions/rps.action';

describe('RpsContainer', ()=>{
    let component: RpsContainer;
    let fixture: ComponentFixture<RpsContainer>;
    let result: IResult[];
    let initialState: RpsState = {
        error: null,
        result: null,
        currentPlay: 0,
        userMoves: []
    }

    let dispatchSpy: jasmine.Spy;
    let store: Store<fromRpsReducer.RpsState>;
    let err: Error;
    
    err = {
        name: '404',
        message: 'city not found'
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
          declarations: [ 
            AboutComponent,
            GameScoreComponent,
            UserActionComponent,
            PlayDetailComponent,
            RpsContainer],
          imports: [
            CommonModule,
            FormsModule,
            StoreModule.forRoot({}),
            EffectsModule.forRoot([])
          ],
          schemas: [CUSTOM_ELEMENTS_SCHEMA],
          providers: [RpsService]
        })
        .compileComponents();
      }));

      beforeEach(() => {
        fixture = TestBed.createComponent(RpsContainer);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        dispatchSpy = spyOn(store, 'dispatch');
        fixture.detectChanges();
      });

      it('should create Rps container', () => {
        expect(component).toBeTruthy();
      });

      it('should dispatch action PlayAction', () => {
        const action = new actions.PlayAction(1);
        component.isBasicPlayMode = true;
        component.playGame(1);
        expect(store.dispatch).toHaveBeenCalledWith(action);
      });

});