import { TestBed, getTestBed } from '@angular/core/testing';
import {StoreModule} from "@ngrx/store";
import { reducer } from '.././store/reducers/rps.reducer';

import { RpsService } from './rps.service';
import { IResult, IAdvancedMove } from 'src/app/model/rps-model';

describe('RpsService', () => {
  let injector;
  let service: RpsService;

  beforeEach(() => {
    const mockWindow: any = {};
    TestBed.configureTestingModule({
        imports: [
            StoreModule.forRoot(reducer),
        ],
        providers: [RpsService]
    });
    injector = getTestBed();
    service = injector.get(RpsService);

});

  it('should be created', () => {
    const service: RpsService = TestBed.get(RpsService);
    expect(service).toBeTruthy();
  });
  
  /*it('should win against pc.', ()=>{
    let mockResponse: IResult = {userMove:1, pcMove:3, score:1}
    const payload: number = 1;
    service.getWinner(payload).subscribe((mockResponse) => {
      expect(mockResponse.pcMove).toBe(3);
      expect(mockResponse.score).toBe(1);
    }); 
  });*/

  it('should lose against pc in advanced mode.', ()=>{
    const payload: IAdvancedMove = {userNewMove: 2, userMoves:[1]};
    service.getAdvanceWinner(payload).subscribe((res: IResult) => {
      expect(res.pcMove).toBe(3);
      expect(res.score).toBe(2);
    });
  });

  it('should be a draw in advanced mode.', ()=>{
    const payload: IAdvancedMove = {userNewMove: 1, userMoves:[1,1,1,1]};
    service.getAdvanceWinner(payload).subscribe((res: IResult) => {
      expect(res.pcMove).toBe(1);
      expect(res.score).toBe(0);
    });
  });
});
