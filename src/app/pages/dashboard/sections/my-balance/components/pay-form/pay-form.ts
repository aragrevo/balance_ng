import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'pay-form',
  imports: [],
  templateUrl: './pay-form.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayFormComponent { }
