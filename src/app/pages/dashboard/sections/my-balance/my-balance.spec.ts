import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBalance } from './my-balance';

describe('MyBalance', () => {
  let component: MyBalance;
  let fixture: ComponentFixture<MyBalance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBalance]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBalance);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
