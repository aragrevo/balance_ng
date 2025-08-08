import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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

@Component({
  selector: 'analytics',
  imports: [DashboardLayoutComponent, UserAvatarComponent, MoneySelectorComponent, DistributionOverviewComponent, MonthlyComparisonComponent],
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
}
