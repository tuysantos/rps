import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.scss']
})
export class GameScoreComponent implements OnInit, OnChanges {
@Input() newScore: number = 0;
userScore : number = 0;
pcScore : number = 0;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.newScore === 1){
      this.userScore++;
    }
    else if(this.newScore === 2){
      this.pcScore++;
    }
    else if(this.newScore === -1){
      this.userScore = 0;
      this.pcScore = 0;
    }
  }

}
