import { afterNextRender, ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MoneySelectorComponent } from '@app/components/money-selector/money-selector';
import { UserAvatarComponent } from '@app/components/user-avatar/user-avatar';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout';
import { getStartOfMonth, getEndOfMonth } from '@app/lib/date';
import { MoneyTypes } from '@app/models/money-types.enum';
import { BalanceData } from '@app/models/user.model';
import { BalanceService } from '@app/services/balance.service';
import { DistributionOverviewComponent } from './sections/distribution-overview/distribution-overview';
import { MonthlyComparisonComponent } from './sections/monthly-comparison/monthly-comparison';
import { Transaction } from '@app/models/transaction.model';
import { TransactionsService } from '@app/services/transactions.service';
import { Category } from '@app/models/category.model';
import { AdminService } from '@app/services/admin.service';
import { LineChartComponent } from '@app/components/line-chart/line-chart';
import { AppStateService } from '@app/services/app-state.service';

@Component({
  selector: 'analytics',
  imports: [DashboardLayoutComponent, UserAvatarComponent, MoneySelectorComponent, DistributionOverviewComponent, MonthlyComparisonComponent, LineChartComponent],
  templateUrl: './analytics.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent {
  balance = signal<Record<MoneyTypes, BalanceData> | null>(null);
  transactions = signal<Transaction[]>([]);
  protected readonly categories = signal<Category[]>([]);

  private readonly balanceService = inject(BalanceService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly adminSvc = inject(AdminService);
  private readonly appStateSvc = inject(AppStateService);

  protected readonly lineChartData = computed(() => this.buildLineData(this.transactions().filter(transaction => transaction.money === this.appStateSvc.getMoney())));


  constructor() {
    afterNextRender(() => {
      this.loadData();
    });
  }

  private loadData() {
    this.loadBalance();
    this.loadTransactions();
    this.loadCategories();
  }

  private loadBalance() {
    const startDate = getStartOfMonth().toISOString();
    const endDate = getEndOfMonth().toISOString();
    this.balanceService.getBalance(startDate, endDate)
      .then(res => {
        this.balance.set(res);
      }).catch(err => {
        console.log(err);
      })

  }

  private loadTransactions() {
    const startDate = getStartOfMonth(new Date(), 6).toISOString();
    const endDate = getEndOfMonth().toISOString();
    this.transactionsService.getTransactions(startDate, endDate)
      .then(res => {
        this.transactions.set(res);
      }).catch(err => {
        console.log(err);
      })

  }

  private loadCategories() {
    this.adminSvc.getExpenseCategories().then(categories => {
      this.categories.set(categories);
    }).catch(error => {
      console.error(error);
    })
  }

  private buildLineData(transactions: Transaction[]) {
    const data = transactions.reduce((acc, transaction) => {
      const month = this.getMonthName(new Date(transaction.date).getMonth() + 1);
      if (month) {
        acc[month] = (acc[month] || 0) + transaction.cost;
      }
      return acc;
    }, {} as Record<string, number>);
    return Object.entries(data).map(([label, value]) => ({ value: +value.toFixed(2), label }));
  }

  private getMonthName(month: number) {
    return new Date(0, month - 1).toLocaleString('es-ES', { month: 'short' });
  }
}
