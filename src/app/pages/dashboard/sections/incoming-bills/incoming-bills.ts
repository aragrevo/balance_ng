import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';

@Component({
  selector: 'incoming-bills',
  imports: [DatePipe, DecimalPipe, CurrencyPipe],
  templateUrl: './incoming-bills.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomingBillsComponent {
  incomes = input<Transaction[]>([]);
}
