import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameScoreComponent } from './game-score.component';

describe('GameScoreComponent', () => {
  let component: GameScoreComponent;
  let fixture: ComponentFixture<GameScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Score should be You 2:1 Pc', ()=>{
    component.userScore = 1;
    component.pcScore = 1;
    component.newScore = 1;
    component.ngOnChanges();

    expect(component.userScore).toEqual(2);
    expect(component.pcScore).toEqual(1);
  });

  it('Score should be You 1:2 Pc', ()=>{
    component.userScore = 1;
    component.pcScore = 1;
    component.newScore = 2;
    component.ngOnChanges();

    expect(component.userScore).toEqual(1);
    expect(component.pcScore).toEqual(2);
  });

  it('Score should be You 0:0 Pc, reset', ()=>{
    component.userScore = 3;
    component.pcScore = 2;
    component.newScore = -1;
    component.ngOnChanges();

    expect(component.userScore).toEqual(0);
    expect(component.pcScore).toEqual(0);
  });
});
