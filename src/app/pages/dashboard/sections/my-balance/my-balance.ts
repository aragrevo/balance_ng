import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ActionButtonDirective } from '@app/directives/action-button.directive';
import { BalanceData } from '@app/models/user.model';
import { FinancialHealthComponent } from './components/financial-health/financial-health.component';
import { Transaction } from '@app/models/transaction.model';
import { MoneyTypes } from '@app/models/money-types.enum';

@Component({
  selector: 'my-balance',
  imports: [DecimalPipe, CurrencyPipe, ActionButtonDirective, FinancialHealthComponent],
  templateUrl: './my-balance.html',
})
export class MyBalance {
  data = input<Record<MoneyTypes, BalanceData> | null>(null);
  incomes = input<Transaction[]>([]);
  transactions = input<Transaction[]>([]);


  protected readonly eurBalance = computed(() => this.data()?.[MoneyTypes.EUR]);
  protected readonly copBalance = computed(() => this.data()?.[MoneyTypes.COP]);



  protected readonly balance = computed(() => !this.eurBalance() ? 0 : this.eurBalance()!.incomes - this.eurBalance()!.expenses);
  protected readonly percentage = computed(() => !this.eurBalance() ? 0 : (this.balance() / this.eurBalance()!.incomes) * 100);

}
