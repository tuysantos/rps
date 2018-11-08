import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'user-action',
  templateUrl: './user-action.component.html',
  styleUrls: ['./user-action.component.scss']
})
export class UserActionComponent {
@Output() playEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  doAction(actionType: number): void {
    this.playEvent.emit(actionType);
  }

}
