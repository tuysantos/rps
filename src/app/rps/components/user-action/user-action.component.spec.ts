import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserActionComponent } from './user-action.component';

describe('UserActionComponent', () => {
  let component: UserActionComponent;
  let fixture: ComponentFixture<UserActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActionComponent);
    component = fixture.componentInstance;
    spyOn(component.playEvent, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event', () => {
    component.doAction(1);
    expect(component.playEvent.emit).toHaveBeenCalled();
    expect(component.playEvent.emit).toHaveBeenCalledWith(1);
  });
});
