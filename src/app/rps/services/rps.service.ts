import { Injectable } from '@angular/core';
import { IResult, IAdvancedMove } from '../../model/rps-model';
import { Observable, of as ObservableOf} from 'rxjs';

@Injectable()
export class RpsService {
  //possible moves:
  /*
  ******* possible moves:
    1 = Rock;
    2 = Paper;
    3 = Scissors;

    ******* possible results:
    1 = user won;
    0 = Draw;
    2 = user lost;
  */
  //private resultValue: Observable<IResult>;
  constructor() { }

  getServerAction(): number {
    return Math.floor(Math.random() * 3) + 1;
  }

  getAdvancedServerAction(moves: any[]): number {
    let result: number = 1;
    let stats = {rock:0, paper:0, scissors:0};
    let tempRock: number = 0;
    let tempPaper: number = 0;
    let tempScissor: number = 0;

    if(moves.length === 0){
      return Math.floor(Math.random() * 3) + 1;
    }
    else {
      moves.forEach(element => {
        switch(element){
          case 1:
            tempRock++;
          break;
          case 2:
            tempPaper++;
          break;
          case 3:
            tempScissor++;
          break;
        }
      });

      stats.rock = this.calculatePercantage(tempRock, moves.length);
      stats.paper = this.calculatePercantage(tempPaper, moves.length);
      stats.scissors = this.calculatePercantage(tempScissor, moves.length);
      let highStatMove = '';
      let highStatScore = 0;
      for (var argument in stats) {
        if((highStatMove === '') || (highStatScore < stats[argument])){
          highStatMove = argument;
          highStatScore = stats[argument];
        }
      }
/*console.log('stats', stats);
console.log('highStatMove = ' + highStatMove);
console.log('highStatScore = ' + highStatScore);
console.log('moves = ', moves);*/
      switch(highStatMove){
        case 'rock':
          if(((stats.paper == 0) && (stats.scissors == 0) && moves.length === 1) || (stats.paper < stats.scissors)){
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else{
              result = 3;
            }
          }
          else {
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else {
              result = 1;
            }
          }
        break;
        case 'paper':
          if(((stats.rock == 0) && (stats.scissors == 0) && moves.length === 1) || (stats.rock > stats.scissors)){
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else {
              result = 1;
            }
          }
          else {
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else {
              result = 2;
            }
          }
        break;
        case 'scissors':
          if(((stats.rock == 0) && (stats.paper == 0) && moves.length === 1) || (stats.rock < stats.paper)){
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else {
              result = 2;
            }
          }
          else {
            if((moves.length >= 4) && moves[moves.length - 1] === moves[moves.length - 2]){
              result = moves[moves.length - 1];
            }
            else {
              result = 3;
            }
          }
        break;
      }
    }
//console.log('result = ' + result);
    return result;
  }

  calculatePercantage(occurancies: number, total:number): number{
    if(occurancies === 0){
      return 0;
    }

    return Math.round((occurancies * 100) / total);
  }
 
  private checkIfUserWon(userMove:number, pcMove:number): number{
    let result = 0;

    switch(userMove){
      case 1: //user play rock
        if(pcMove === 2){
          result = 2;
        }
        else if(pcMove === 3){
          result = 1;
        }
      break;

      case 2: //user play paper
        if(pcMove === 1){
          result = 1;
        }
        else if(pcMove === 3){
          result = 2;
        }
      break;

      case 3: //user play scissors
        if(pcMove === 1){
          result = 2;
        }
        else if(pcMove === 2){
          result = 1;
        }
      break;
    }
    return result;
  }

  getWinner(payload:number): Observable<any> {
    let pcMove : number = this.getServerAction();
    let tempValue : IResult = {
      userMove : payload,
      pcMove : pcMove,
      score : this.checkIfUserWon(payload, pcMove)
    }
    return ObservableOf(tempValue);
  } 

  getAdvanceWinner(payload: IAdvancedMove): Observable<any> {
    let pcMove : number = this.getAdvancedServerAction(payload.userMoves);
    let tempValue : IResult = {
      userMove : payload.userNewMove,
      pcMove : pcMove,
      score : this.checkIfUserWon(payload.userNewMove, pcMove)
    }
    return ObservableOf(tempValue);
  } 

}
