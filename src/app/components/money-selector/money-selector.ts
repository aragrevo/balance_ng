import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';

@Component({
  selector: 'money-selector',
  imports: [],
  templateUrl: './money-selector.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneySelectorComponent {
  protected money = signal(MoneyTypes.EUR);
  protected isOpen = signal(false);
  urlsMoney = [
    {
      money: MoneyTypes.EUR,
      url: 'eur/dashboard',
    },
    {
      money: MoneyTypes.COP,
      url: 'cop/dashboard',
    },
  ];

  toggleOpen() {
    this.isOpen.update((value) => !value);
  }

  onSelectMoney(money: MoneyTypes) {
    this.money.set(money);
    this.toggleOpen();
  }
}
