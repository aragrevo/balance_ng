import { JsonPipe } from '@angular/common';
import { afterNextRender, ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { OffcanvasComponent } from '@app/components/offcanvas';
import { Category } from '@app/models/category.model';
import { MoneyTypes } from '@app/models/money-types.enum';
import { Transaction } from '@app/models/transaction.model';
import { AdminService } from '@app/services/admin.service';
import { TransactionsService } from '@app/services/transactions.service';

@Component({
  selector: 'pay-form',
  imports: [FormsModule, OffcanvasComponent, JsonPipe],
  templateUrl: './pay-form.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayFormComponent {
  protected readonly categories = signal<Category[]>([]);
  private readonly adminSvc = inject(AdminService);
  private readonly transactionsSvc = inject(TransactionsService);

  private readonly payForm = viewChild<NgForm>('payForm');
  saved = output<boolean>();
  protected saving = signal(false);
  isOffcanvasPayOpen = signal(false);


  protected payTransaction = model<Partial<Transaction>>({
    // description: '-1',
    observation: ''
  })

  constructor() {
    afterNextRender(() => {
      this.adminSvc.getExpenseCategories().then(categories => {
        this.categories.set(categories);
        alert('Categorias obtenidas');
      }).catch(error => {
        console.error(error);
        alert('Error al obtener las categorias' + error);
      })
    })

    effect(() => {
      if (this.isOffcanvasPayOpen()) {
        this.payForm()?.resetForm();
      }
    })
  }

  private saveTransaction(transaction: Transaction) {
    this.transactionsSvc.saveTransaction(transaction).then(data => {
      this.saved.emit(true);
      this.isOffcanvasPayOpen.set(false);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.saving.set(false);
    })
  }

  onSubmit() {
    const form = this.payForm()?.form!;
    if (form.valid) {
      this.saving.set(true);
      this.saveTransaction(form.value);
    }
  }
}
