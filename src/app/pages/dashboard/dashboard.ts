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

@Component({
  selector: 'dashboard',
  imports: [UserAvatarComponent, MoneySelectorComponent, MyBalance, TransactionsComponent],
  templateUrl: './dashboard.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'h-full w-full',
  },
  styles: `
    .slide-in {
      animation: slide-in 300ms ease-in;
    }

    @keyframes slide-in {
      from {
        transform: translateX(120%);
      }
      to {
        transform: translateX(0);
      }
    }

    .slide-out {
      animation: slide-out 300ms ease-out;
    }

    @keyframes slide-out {
      from {
        transform: translateX(0);
      }
      to {
        transform: translateX(-120%);
      }
    }
  `,
})
export class DashboardComponent {
  private readonly authService = inject(AuthService);
  private readonly balanceService = inject(BalanceService);
  private readonly transactionsService = inject(TransactionsService);
  user = toSignal(this.authService.user$, {
    requireSync: true,
  });
  tab = signal('balance');
  balance = signal<BalanceData | null>(null);
  transactions = signal<Transaction[]>([]);

  constructor() {
    afterNextRender(() => {
      this.loadBalance()
      this.loadTransactions()
    });
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

  signOut() {
    this.authService.signOut();
  }

  changeTab(id: string) {
    this.tab.set(id);
  }
}

