import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-play-detail',
  templateUrl: './play-detail.component.html',
  styleUrls: ['./play-detail.component.scss']
})
export class PlayDetailComponent implements OnInit, OnChanges {

  yourImg: string = '';
  yourIcon: string = '';
  pcImg: string = '';
  pcIcon: string = '';
  messageResult: string = '';
  messageBigResult: string = '';

  @Input() gameResult: number;
  @Input() userMove: number;
  @Input() pcMove: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    let userImg = this.getImageByMove(this.userMove);
    let pcImg = this.getImageByMove(this.pcMove);
    switch(this.gameResult){
      case 0:
        this.messageBigResult = "It's a Draw!";
        this.updateState('Try again!', 'thinking.jpg', userImg, 'thinking.jpg', pcImg);
      break;
      case 1:
        this.messageBigResult = "You won!";
        this.updateState('Well done!', 'happy.jpg', userImg, 'sad.jpg', pcImg);
      break;
      case 2:
        this.messageBigResult = "You lost!";
        this.updateState('Never mind!', 'sad.jpg', userImg, 'happy.jpg', pcImg);
      break;
    }
  }

  updateState(messageResult, yourIcon, yourImg, pcIcon, pcImg): void {
    let basePath = '../../../../assets/images/';
    this.messageResult = messageResult;
    this.yourIcon = basePath + yourIcon;
    this.yourImg = basePath + yourImg;
    this.pcIcon = basePath + pcIcon;
    this.pcImg = basePath + pcImg;
  }

  getImageByMove(move: number): string {
    let arrayImg = ['','rock.jpg','paper.jpg','scissors.jpg'];
    return (move > 0)? arrayImg[move] : '';
  }

}
