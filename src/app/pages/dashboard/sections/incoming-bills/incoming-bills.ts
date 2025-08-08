import { CurrencyPipe, DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { Transaction } from '@app/models/transaction.model';
import { ReceiveFormComponent } from '../../components/receive-form/receive-form';

@Component({
  selector: 'incoming-bills',
  imports: [DatePipe, CurrencyPipe, ReceiveFormComponent],
  templateUrl: './incoming-bills.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncomingBillsComponent {
  MoneyTypes = MoneyTypes;
  incomes = input<Transaction[]>([]);
  refresh = output<void>();

  transactionSaved() {
    this.refresh.emit();
  }
}
