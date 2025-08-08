import { Injectable, signal } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppStateService {
  private money = signal<MoneyTypes>(MoneyTypes.EUR);

  setMoney(money: MoneyTypes): void {
    this.money.set(money);
  }

  getMoney(): MoneyTypes {
    return this.money();
  }

}
