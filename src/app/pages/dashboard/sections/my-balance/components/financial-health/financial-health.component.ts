import { DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { Transaction } from '@app/models/transaction.model';
import { BalanceData } from '@app/models/user.model';

@Component({
  selector: 'financial-health',
  imports: [DecimalPipe],
  templateUrl: './financial-health.component.html',
  styles: `
    :host {
      display: block;
    }
    .bg-red-500-20 {
      background-color: rgba(251,44,54,0.2);
    }
    .bg-indigo-500-20 {
      background-color: rgba(97,95,255,0.2)
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FinancialHealthComponent {
  balance = input.required<Record<MoneyTypes, BalanceData> | null>();
  transactions = input.required<Transaction[]>();
  incomes = input.required<Transaction[]>();

  protected readonly eurBalance = computed(() => this.balance()?.[MoneyTypes.EUR]);
  protected readonly copBalance = computed(() => this.balance()?.[MoneyTypes.COP]);
  protected readonly eurTransactions = computed(() => this.transactions()?.filter((t) => t.money === MoneyTypes.EUR));
  protected readonly copTransactions = computed(() => this.transactions()?.filter((t) => t.money === MoneyTypes.COP));
  protected readonly amounts = computed(() => {
    return [
      {
        type: "EUR Incomes",
        values:
          this.incomes()?.filter((t) => t.money === MoneyTypes.EUR).map((t) => t.cost) ||
          [],
      },
      { type: "EUR Expenses", values: this.eurTransactions()?.map((t) => t.cost) || [] },
      {
        type: "COP Incomes",
        values:
          this.incomes()?.filter((t) => t.money === MoneyTypes.COP).map((t) => t.cost) ||
          [],
      },
      { type: "COP Expenses", values: this.copTransactions()?.map((t) => t.cost) || [] },
    ];
  });

}
