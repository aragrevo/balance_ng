import { afterNextRender, ChangeDetectionStrategy, Component, inject, model, output, signal, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CategorySelectComponent } from '@app/components/category-select/category-select';
import { OffcanvasComponent } from '@app/components/offcanvas';
import { ActionButtonDirective } from '@app/directives/action-button.directive';
import { Category } from '@app/models/category.model';
import { Transaction } from '@app/models/transaction.model';
import { AdminService } from '@app/services/admin.service';
import { IncomesService } from '@app/services/incomes.service';

@Component({
  selector: 'receive-form',
  imports: [FormsModule, ActionButtonDirective, OffcanvasComponent, CategorySelectComponent],
  templateUrl: './receive-form.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiveFormComponent {
  private readonly receiveForm = viewChild<NgForm>('receiveForm');
  saved = output<boolean>();
  protected saving = signal(false);
  isOffcanvasReceiveOpen = signal(false);
  protected readonly categories = signal<Category[]>([]);

  private readonly adminSvc = inject(AdminService);
  private readonly incomesSvc = inject(IncomesService);

  protected selectedCategory = signal<Category | null>(null);
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
  }

  private saveTransaction(transaction: Transaction) {
    transaction.description = this.selectedCategory()!.id;
    this.incomesSvc.saveIncome(transaction).then(data => {
      this.saved.emit(true);
      this.isOffcanvasReceiveOpen.set(false);
    }).catch(error => {
      console.error(error);
    }).finally(() => {
      this.saving.set(false);
    })
  }

  onSubmit() {
    if (!this.selectedCategory()) {
      alert('Selecciona una categoria');
      return;
    }

    const form = this.receiveForm()?.form!;
    if (form.valid) {
      this.saving.set(true);
      this.saveTransaction(form.value);
    }
  }
}
