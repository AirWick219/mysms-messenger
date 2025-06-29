import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Messenger } from './messenger-layout';

describe('Messenger', () => {
  let component: Messenger;
  let fixture: ComponentFixture<Messenger>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Messenger],
    }).compileComponents();

    fixture = TestBed.createComponent(Messenger);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
