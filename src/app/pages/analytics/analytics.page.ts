import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MoneySelectorComponent } from '@app/components/money-selector/money-selector';
import { UserAvatarComponent } from '@app/components/user-avatar/user-avatar';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout';
import { getStartOfMonth, getEndOfMonth } from '@app/lib/date';
import { MoneyTypes } from '@app/models/money-types.enum';
import { BalanceData } from '@app/models/user.model';
import { BalanceService } from '@app/services/balance.service';
import { DistributionOverviewComponent } from './sections/distribution-overview/distribution-overview';

@Component({
  selector: 'analytics',
  imports: [DashboardLayoutComponent, UserAvatarComponent, MoneySelectorComponent, DistributionOverviewComponent],
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

  private readonly balanceService = inject(BalanceService);
  constructor() {
    afterNextRender(() => {
      this.loadData();
    });
  }

  private loadData() {
    this.loadBalance();
    // this.loadTransactions();
    // this.loadIncomes();
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
}
