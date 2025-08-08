import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MoneyTypes } from '@app/models/money-types.enum';
import { AppStateService } from '@app/services/app-state.service';

@Component({
  selector: 'money-selector',
  imports: [],
  templateUrl: './money-selector.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoneySelectorComponent {
  private readonly appStateService = inject(AppStateService);
  protected money = computed(() => this.appStateService.getMoney());
  protected isOpen = signal(false);
  urlsMoney = [
    {
      money: MoneyTypes.EUR,
      url: 'eur/dashboard',
    },
    {
      money: MoneyTypes.COP,
      url: 'cop/dashboard',
    },
  ];

  toggleOpen() {
    this.isOpen.update((value) => !value);
  }

  onSelectMoney(money: MoneyTypes) {
    this.appStateService.setMoney(money);
    this.toggleOpen();
  }
}
