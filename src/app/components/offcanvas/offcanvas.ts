import {
  Component,
  input,
  output,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'offcanvas',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  template: `
    <!-- Backdrop -->
    <div
      class="fixed inset-0 bg-black/50 z-40 transition-opacity duration-150"
      [class.opacity-0]="!isOpen()"
      [class.opacity-100]="isOpen()"
      [class.invisible]="!isOpen()"
      [class.visible]="isOpen()"
    ></div>

    <!-- Offcanvas Panel -->
    <div
      class="fixed z-50 border-tertiary bg-tertiary shadow-lg transition-transform duration-300 ease-in-out flex flex-col rounded-t-2xl border p-4"
      [class]="getPositionClasses()"
      [class.invisible]="!isOpen()"
      [class.visible]="isOpen()"
    >
      <!-- Header -->
      <header class="mb-8 flex items-center justify-between">
        <button
          type="button"
          class="hide-aside rounded-full border border-white/90 p-2 text-white hover:cursor-pointer hover:opacity-80"
          (click)="close()"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4 -rotate-90"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </header>

      <!-- Body -->
      <div class="flex-1 p-4 overflow-y-auto">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: ``,
})
export class OffcanvasComponent {
  // Inputs
  isOpen = input<boolean>(false);
  title = input<string>('');
  position = input<'start' | 'end' | 'top' | 'bottom'>('end');

  // Outputs
  onClose = output<void>();

  close() {
    this.onClose.emit();
  }

  getPositionClasses(): string {
    const baseClasses = 'max-w-md max-h-full ';
    const position = this.position();
    const isOpen = this.isOpen();

    switch (position) {
      case 'start':
        return `${baseClasses} top-0 left-0 h-full w-96 border-r border-gray-200 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          }`;
      case 'end':
        return `${baseClasses} top-0 right-0 h-full w-96 border-l border-gray-200 ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`;
      case 'top':
        return `${baseClasses} top-0 left-0 right-0 h-1/3 border-b border-gray-200 ${isOpen ? 'translate-y-0' : '-translate-y-full'
          }`;
      case 'bottom':
        return `${baseClasses} mx-auto inset-0 ${isOpen ? 'translate-y-0' : 'translate-y-full'
          }`;
      default:
        return baseClasses;
    }
  }
}
