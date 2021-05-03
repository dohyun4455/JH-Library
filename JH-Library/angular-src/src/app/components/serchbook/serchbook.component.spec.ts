import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerchbookComponent } from './serchbook.component';

describe('SerchbookComponent', () => {
  let component: SerchbookComponent;
  let fixture: ComponentFixture<SerchbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SerchbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SerchbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
