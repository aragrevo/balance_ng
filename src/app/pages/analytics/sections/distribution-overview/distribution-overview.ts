import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { DonutChartComponent } from '@app/components/donut-chart/donut-chart';
import { MoneyTypes } from '@app/models/money-types.enum';
import { BalanceData } from '@app/models/user.model';
import { AppStateService } from '@app/services/app-state.service';

@Component({
  selector: 'distribution-overview',
  imports: [DonutChartComponent],
  template: `
  <article class="p-4">
            <h2 class="mb-6 text-xl text-white">Distribution Overview</h2>
            <div
                class="flex justify-center rounded-md border border-white/10 bg-transparent bg-gradient-to-br p-4 text-white shadow-2xl shadow-white/5 backdrop-blur-3xl">
                <!-- <DonutChart data={chartData} size={300} thickness={50} /> -->
                 <donut-chart [data]="chartData()" />
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
export class DistributionOverviewComponent {
  private readonly appStateSvc = inject(AppStateService);
  balance = input.required<Record<MoneyTypes, BalanceData> | null>();
  private readonly balanceByMoney = computed(() => this.balance()?.[this.appStateSvc.getMoney()]);
  private readonly expenses = computed(() => this.balanceByMoney()?.expenses ?? 0);
  private readonly incomes = computed(() => this.balanceByMoney()?.incomes ?? 0);


  protected readonly chartData = computed(() => [
    {
      label: "Expenses",
      value: this.expenses(),
      color: "#FF6B6B", // Salmón claro
    },
    {
      label: "Income",
      value: this.incomes(),
      color: "#A5B4FC", // Coral rojo
    },
  ]);
}
