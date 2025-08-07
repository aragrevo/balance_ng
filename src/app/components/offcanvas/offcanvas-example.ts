import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { OffcanvasComponent } from './offcanvas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-offcanvas-example',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, OffcanvasComponent],
  template: `
    <div class="max-w-4xl mx-auto p-6">
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Ejemplo de Offcanvas</h2>
      
      <div class="flex flex-wrap gap-3 mb-6">
        <button 
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
          (click)="openOffcanvas('start')"
        >
          Abrir desde la izquierda
        </button>
        
        <button 
          class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
          (click)="openOffcanvas('end')"
        >
          Abrir desde la derecha
        </button>
        
        <button 
          class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" 
          (click)="openOffcanvas('top')"
        >
          Abrir desde arriba
        </button>
        
        <button 
          class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2" 
          (click)="openOffcanvas('bottom')"
        >
          Abrir desde abajo
        </button>
      </div>
    </div>

    <!-- Offcanvas con contenido dinámico -->
    <offcanvas
      [isOpen]="isOffcanvasOpen()"
      [title]="offcanvasTitle()"
      [position]="offcanvasPosition()"
      (onClose)="closeOffcanvas()"
    >
      <!-- Contenido personalizado que se pasa al offcanvas -->
      <div class="space-y-6">
        <div>
          <h4 class="text-xl font-semibold text-gray-900 mb-2">Contenido dinámico</h4>
          <p class="text-gray-600">Este es un ejemplo de contenido que se puede pasar al componente offcanvas.</p>
        </div>
        
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Ejemplo de formulario:</label>
            <input 
              type="text" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Escribe algo..."
            >
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Selecciona una opción:</label>
            <select class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Opción 1</option>
              <option>Opción 2</option>
              <option>Opción 3</option>
            </select>
          </div>
          
          <div class="flex items-center">
            <input 
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
              type="checkbox" 
              id="check1"
            >
            <label class="ml-2 block text-sm text-gray-700" for="check1">
              Acepto los términos y condiciones
            </label>
          </div>
          
          <div class="flex gap-3">
            <button class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Guardar
            </button>
            <button 
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2" 
              (click)="closeOffcanvas()"
            >
              Cancelar
            </button>
          </div>
        </div>
        
        <hr class="border-gray-200">
        
        <div>
          <h5 class="text-lg font-medium text-gray-900 mb-3">Lista de elementos</h5>
          <ul class="space-y-2">
            @for (item of sampleItems; track item.id) {
              <li class="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                <span class="text-gray-900">{{ item.name }}</span>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {{ item.count }}
                </span>
              </li>
            }
          </ul>
        </div>
      </div>
    </offcanvas>
  `,
  styles: ``
})
export class OffcanvasExampleComponent {
  // Señales para controlar el estado del offcanvas
  isOffcanvasOpen = signal(false);
  offcanvasTitle = signal('');
  offcanvasPosition = signal<'start' | 'end' | 'top' | 'bottom'>('end');

  // Datos de ejemplo
  sampleItems = [
    { id: 1, name: 'Elemento 1', count: 5 },
    { id: 2, name: 'Elemento 2', count: 12 },
    { id: 3, name: 'Elemento 3', count: 8 },
    { id: 4, name: 'Elemento 4', count: 3 }
  ];

  openOffcanvas(position: 'start' | 'end' | 'top' | 'bottom') {
    this.offcanvasPosition.set(position);
    this.offcanvasTitle.set(`Offcanvas desde ${this.getPositionText(position)}`);
    this.isOffcanvasOpen.set(true);
  }

  closeOffcanvas() {
    this.isOffcanvasOpen.set(false);
  }

  private getPositionText(position: string): string {
    const positions: Record<string, string> = {
      'start': 'la izquierda',
      'end': 'la derecha',
      'top': 'arriba',
      'bottom': 'abajo'
    };
    return positions[position] || position;
  }
}