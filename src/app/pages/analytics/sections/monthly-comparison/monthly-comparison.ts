import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { BarChartComponent } from '@app/components/bar-chart/bar-chart.component';
import { Category } from '@app/models/category.model';
import { Transaction } from '@app/models/transaction.model';

@Component({
  selector: 'monthly-comparison',
  imports: [BarChartComponent],
  template: `
    <article class="p-4">
      <h2 class="mb-6 text-xl text-white">Monthly Comparison</h2>
      <div
        class="flex justify-center rounded-md border border-white/10 bg-transparent bg-gradient-to-br p-4 text-white shadow-2xl shadow-white/5 backdrop-blur-3xl"
      >
        <bar-chart [transactions]="transactions()" [categories]="categories()" />
      </div>
    </article>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonthlyComparisonComponent {
  categories = input<Category[]>([]);
  transactions = input<Transaction[]>([]);
}
