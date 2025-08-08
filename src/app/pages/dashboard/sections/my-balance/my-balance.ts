import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input, output, signal } from '@angular/core';
import { ActionButtonDirective } from '@app/directives/action-button.directive';
import { BalanceData } from '@app/models/user.model';
import { FinancialHealthComponent } from './components/financial-health/financial-health.component';
import { Transaction } from '@app/models/transaction.model';
import { MoneyTypes } from '@app/models/money-types.enum';
import { PayFormComponent } from "../../components/pay-form/pay-form";
import { ReceiveFormComponent } from '../../components/receive-form/receive-form';
import { AppStateService } from '@app/services/app-state.service';

@Component({
  selector: 'my-balance',
  imports: [DecimalPipe, CurrencyPipe, ActionButtonDirective, FinancialHealthComponent, PayFormComponent, ReceiveFormComponent],
  templateUrl: './my-balance.html',
})
export class MyBalance {
  data = input<Record<MoneyTypes, BalanceData> | null>(null);
  incomes = input<Transaction[]>([]);
  transactions = input<Transaction[]>([]);
  refresh = output<void>();

  private readonly appStateService = inject(AppStateService);
  protected readonly money = computed(() => this.appStateService.getMoney());

  private readonly moneyBalance = computed(() => this.data()?.[this.money()]);

  protected readonly balance = computed(() => !this.moneyBalance() ? 0 : this.moneyBalance()!.incomes - this.moneyBalance()!.expenses);
  protected readonly percentage = computed(() => !this.moneyBalance() ? 0 : (this.balance() / this.moneyBalance()!.incomes) * 100);

  transactionSaved() {
    this.refresh.emit();
  }
}
