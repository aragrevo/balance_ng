import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '@app/components/navigation/navigation';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  template: `

      <main class="pb-20 px-6 pt-6 h-full overflow-x-hidden">
        <ng-content></ng-content>
      </main>
      <navigation />

  `,
  imports: [CommonModule, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent { }