import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';

@Component({
  selector: 'transactions',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './transactions.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsComponent {
  readonly transactions = input.required<Transaction[]>();
}
