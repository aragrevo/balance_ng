import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { ActionButtonDirective } from '@app/directives/action-button.directive';
import { BalanceData } from '@app/models/user.model';
import { FinancialHealthComponent } from './components/financial-health/financial-health.component';
import { Transaction } from '@app/models/transaction.model';
import { MoneyTypes } from '@app/models/money-types.enum';
import { PayFormComponent } from "./components/pay-form/pay-form";
import { OffcanvasComponent } from '@app/components/offcanvas/offcanvas';
import { ReceiveFormComponent } from './components/receive-form/receive-form';

@Component({
  selector: 'my-balance',
  imports: [DecimalPipe, CurrencyPipe, ActionButtonDirective, FinancialHealthComponent, PayFormComponent, OffcanvasComponent, ReceiveFormComponent],
  templateUrl: './my-balance.html',
})
export class MyBalance {
  data = input<Record<MoneyTypes, BalanceData> | null>(null);
  incomes = input<Transaction[]>([]);
  transactions = input<Transaction[]>([]);
  refresh = output<void>();



  protected readonly eurBalance = computed(() => this.data()?.[MoneyTypes.EUR]);
  protected readonly copBalance = computed(() => this.data()?.[MoneyTypes.COP]);
  protected readonly balance = computed(() => !this.eurBalance() ? 0 : this.eurBalance()!.incomes - this.eurBalance()!.expenses);
  protected readonly percentage = computed(() => !this.eurBalance() ? 0 : (this.balance() / this.eurBalance()!.incomes) * 100);

  isOffcanvasPayOpen = signal(false);
  isOffcanvasReceiveOpen = signal(false);


  transactionSaved() {
    this.isOffcanvasPayOpen.set(false);
    this.refresh.emit();
  }
}
