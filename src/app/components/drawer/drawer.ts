import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'drawer',
  imports: [],
  templateUrl: './drawer.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawerComponent { }
