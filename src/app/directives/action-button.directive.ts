import { Directive } from '@angular/core';

@Directive({
  selector: '[actionButton]',
  host: {
    class: 'flex items-center justify-center gap-2 rounded-full px-6 py-3 text-tertiary text-xs font-medium transition-colors hover:opacity-80 hover:cursor-pointer',
  },
})
export class ActionButtonDirective { }
