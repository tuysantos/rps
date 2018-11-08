import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import { RpsService } from './services/rps.service';
import { RpsContainer } from './rps.container';
import {RpsEffects} from './store/effects/rps.effect';
import { reducer } from './store/reducers/rps.reducer';
import { AboutComponent } from "./components/about/about.component";
import { GameScoreComponent } from "./components/game-score/game-score.component";
import { UserActionComponent } from "./components/user-action/user-action.component";
import { PlayDetailComponent } from './components/play-detail/play-detail.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      StoreModule.forFeature('rps', reducer),
      EffectsModule.forFeature([RpsEffects])
    ],
    declarations: [
      AboutComponent,
      GameScoreComponent,
      UserActionComponent,
      PlayDetailComponent,
      RpsContainer,
      PlayDetailComponent
    ],
    providers: [RpsService]
  })
  export class RpsModule { }