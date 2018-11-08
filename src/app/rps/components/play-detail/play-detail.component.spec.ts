import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayDetailComponent } from './play-detail.component';

describe('PlayDetailComponent', () => {
  let component: PlayDetailComponent;
  let fixture: ComponentFixture<PlayDetailComponent>;
  let testPath = '../../../../assets/images/';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should capture when user wins game', ()=>{
    component.userMove = 1;
    component.pcMove = 3;
    component.gameResult = 1;
    component.ngOnChanges();

    expect(component.messageBigResult).toEqual('You won!');
    expect(component.messageResult).toEqual('Well done!');
    expect(component.yourIcon).toEqual(testPath + 'happy.jpg');
    expect(component.yourImg).toEqual(testPath + 'rock.jpg');
    expect(component.pcIcon).toEqual(testPath + 'sad.jpg');
    expect(component.pcImg).toEqual(testPath + 'scissors.jpg');
  });

  it('should capture when user lose game', ()=>{
    component.userMove = 1;
    component.pcMove = 2;
    component.gameResult = 2;
    component.ngOnChanges();

    expect(component.messageBigResult).toEqual('You lost!');
    expect(component.messageResult).toEqual('Never mind!');
    expect(component.yourIcon).toEqual(testPath + 'sad.jpg');
    expect(component.yourImg).toEqual(testPath + 'rock.jpg');
    expect(component.pcIcon).toEqual(testPath + 'happy.jpg');
    expect(component.pcImg).toEqual(testPath + 'paper.jpg');
  });

  it('should capture when user draws game', ()=>{
    component.userMove = 1;
    component.pcMove = 1;
    component.gameResult = 0;
    component.ngOnChanges();

    expect(component.messageBigResult).toEqual("It's a Draw!");
    expect(component.messageResult).toEqual('Try again!');
    expect(component.yourIcon).toEqual(testPath + 'thinking.jpg');
    expect(component.yourImg).toEqual(testPath + 'rock.jpg');
    expect(component.pcIcon).toEqual(testPath + 'thinking.jpg');
    expect(component.pcImg).toEqual(testPath + 'rock.jpg');
  });
});

