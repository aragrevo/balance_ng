import { Directive, input } from '@angular/core';

@Directive({
  selector: '[actionButton]',
  host: {
    class: 'flex items-center justify-center gap-2 rounded-full px-6 py-3 font-medium transition-colors hover:opacity-80 hover:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:text-gray active:scale-[99%]',
    '[class.text-xs]': 'size() === "small"',
    '[class.text-sm]': 'size() === "medium"',
    '[class.text-base]': 'size() === "large"',
  },
})
export class ActionButtonDirective {
  size = input<'small' | 'medium' | 'large'>('small');
}
