import { ComponentFixture, TestBed } from '@angular/core/testing';

import CheckListComponent from './check-list.component';

describe('CheckListComponent', () => {
  let component: CheckListComponent;
  let fixture: ComponentFixture<CheckListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CheckListComponent]
    });
    fixture = TestBed.createComponent(CheckListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

});
