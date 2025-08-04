import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DashboardLayoutComponent } from '@app/layouts/dashboard-layout';

@Component({
  selector: 'analytics',
  imports: [DashboardLayoutComponent],
  templateUrl: './analytics.page.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalyticsComponent { }
