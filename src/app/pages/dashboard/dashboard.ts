import { afterNextRender, ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MoneySelectorComponent } from '@app/components/money-selector/money-selector';
import { UserAvatarComponent } from '@app/components/user-avatar/user-avatar';
import { AuthService } from '@app/services/auth.service';
import { MyBalance } from './sections/my-balance/my-balance';
import { BalanceService } from '@app/services/balance.service';
import { getEndOfMonth, getStartOfMonth } from '@app/lib/date';
import { BalanceData } from '@app/models/user.model';
import { TransactionsComponent } from './sections/transactions/transactions';
import { Transaction } from '@app/models/transaction.model';
import { TransactionsService } from '@app/services/transactions.service';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout';
import { FallbackComponent } from '@app/components/fallback/fallback';
import { MoneyTypes } from '@app/models/money-types.enum';
import { IncomesService } from '@app/services/incomes.service';
import { IncomingBillsComponent } from './sections/incoming-bills/incoming-bills';

@Component({
  selector: 'dashboard',
  imports: [DashboardLayoutComponent, UserAvatarComponent, MoneySelectorComponent, FallbackComponent, MyBalance, TransactionsComponent, IncomingBillsComponent],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full w-full',
  },
  styles: `
    .fade-in {
      animation: fade-in 300ms ease-in;
    }

    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    li {
      position: relative;
    }

    li::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 2px;
      background-color: var(--color-quaternary);
      transform: scaleX(1);
      transition: transform 300ms ease-in-out;
    }

    li.active::after {
      transform: scaleX(0);
    }
  `,
})
export class DashboardComponent {
  protected readonly MoneyTypes = MoneyTypes;
  private readonly authService = inject(AuthService);
  private readonly balanceService = inject(BalanceService);
  private readonly transactionsService = inject(TransactionsService);
  private readonly incomesService = inject(IncomesService);

  user = toSignal(this.authService.user$, {
    requireSync: true,
  });
  tab = signal('balance');
  balance = signal<Record<MoneyTypes, BalanceData> | null>(null);
  transactions = signal<Transaction[]>([]);
  incomes = signal<Transaction[]>([]);

  constructor() {
    afterNextRender(() => {
      this.loadData();
    });
  }

  private loadData() {
    this.loadBalance();
    this.loadTransactions();
    this.loadIncomes();
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
    const startDate = getStartOfMonth().toISOString();
    const endDate = getEndOfMonth().toISOString();
    this.transactionsService.getTransactions(startDate, endDate)
      .then(res => {
        this.transactions.set(res);
      }).catch(err => {
        console.log(err);
      })

  }
  private loadIncomes() {
    const startDate = getStartOfMonth().toISOString();
    const endDate = getEndOfMonth().toISOString();
    this.incomesService.getIncomes(startDate, endDate)
      .then(res => {
        this.incomes.set(res);
      }).catch(err => {
        console.log(err);
      })

  }

  signOut() {
    this.authService.signOut();
  }

  changeTab(id: string) {
    this.tab.set(id);
  }

  refreshData() {
    this.loadData();
  }
}

