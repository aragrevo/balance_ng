import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ActionButtonDirective } from '@app/directives/action-button.directive';
import { BalanceData } from '@app/models/user.model';

@Component({
  selector: 'my-balance',
  imports: [DecimalPipe, CurrencyPipe, ActionButtonDirective],
  templateUrl: './my-balance.html',
})
export class MyBalance {
  data = input<BalanceData | null>(null);
  protected readonly balance = computed(() => !this.data() ? 0 : this.data()!.incomes - this.data()!.expenses);
  protected readonly percentage = computed(() => !this.data() ? 0 : (this.balance() / this.data()!.incomes) * 100);

}
