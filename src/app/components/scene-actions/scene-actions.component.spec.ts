import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SceneActionsComponent } from './scene-actions.component';

describe('SceneActionsComponent', () => {
  let component: SceneActionsComponent;
  let fixture: ComponentFixture<SceneActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SceneActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SceneActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
