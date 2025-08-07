import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from '@app/components/navigation/navigation';

@Component({
  selector: 'dashboard-layout',
  standalone: true,
  template: `

      <main class="pb-20 overflow-x-hidden h-dvh scroll-smooth scrollbar-hide">
        <ng-content></ng-content>
      </main>
      <navigation />

  `,
  imports: [CommonModule, NavigationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardLayoutComponent { }