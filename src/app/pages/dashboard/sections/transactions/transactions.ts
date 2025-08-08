import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, output } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { Transaction } from '@app/models/transaction.model';
import { AppStateService } from '@app/services/app-state.service';
import { PayFormComponent } from '../../components/pay-form/pay-form';

@Component({
  selector: 'transactions',
  imports: [DatePipe, CurrencyPipe, PayFormComponent],
  templateUrl: './transactions.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  MoneyTypes = MoneyTypes;
  refresh = output<void>();

  readonly transactions = input.required<Transaction[]>();
  private readonly appStateService = inject(AppStateService);
  protected readonly money = computed(() => this.appStateService.getMoney());
  readonly computedTransactions = computed(() => this.transactions().filter(transaction => transaction.money === this.money()));

  transactionSaved() {
    this.refresh.emit();
  }
}
