import { afterNextRender, ChangeDetectionStrategy, Component, effect, inject, input, model, output, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Category } from '@app/models/category.model';
import { Transaction } from '@app/models/transaction.model';
import { AdminService } from '@app/services/admin.service';
import { IncomesService } from '@app/services/incomes.service';

@Component({
  selector: 'receive-form',
  imports: [FormsModule],
  templateUrl: './receive-form.html',
  styles: `
    :host {
      display: block;
    }
    .custom-select {
    &,
    &::picker(select) {
      appearance: base-select;
    }
  }

  .custom-select {
    &::picker(select) {
      background-color: transparent;
      border: none;
      opacity: 0;
      transition: all 0.4s allow-discrete;
      max-width: 200px;
    }
    &::picker(select):popover-open {
      opacity: 1;
    }
    @starting-style {
      &::picker(select):popover-open {
        opacity: 0;
      }
    }
    &::picker(select) {
      top: calc(anchor(bottom) + 5px);
      left: 50%;
      transform: translateX(-50%);
      max-width: 200px;
    }
  }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiveFormComponent {
  private readonly receiveForm = viewChild<NgForm>('receiveForm');
  reset = input(false);
  saved = output<boolean>();
  saving = signal(false);
  protected readonly categories = signal<Category[]>([]);

  private readonly adminSvc = inject(AdminService);
  private readonly incomesSvc = inject(IncomesService);

  protected receiveTransaction = model<Partial<Transaction>>({
    // description: '-1',
    observation: ''
  })

  constructor() {
    afterNextRender(() => {
      this.adminSvc.getIncomeCategories().then(categories => {
        this.categories.set(categories);
      }).catch(error => {
        console.error(error);
      })
    })

    effect(() => {
      if (this.reset()) {
        this.receiveForm()?.resetForm();
      }
    })
  }

  private saveTransaction(transaction: Transaction) {
    this.incomesSvc.saveIncome(transaction).then(data => {
      this.saved.emit(true);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.saving.set(false);
    })
  }

  onSubmit() {
    const form = this.receiveForm()?.form!;
    if (form.valid) {
      this.saving.set(true);
      this.saveTransaction(form.value);
    }
  }
}
