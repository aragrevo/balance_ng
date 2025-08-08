import { ChangeDetectionStrategy, Component, computed, effect, input, signal } from '@angular/core';

@Component({
  selector: 'donut-chart',
  imports: [],
  templateUrl: './donut-chart.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonutChartComponent {
  data = input<{
    label: string;
    value: number;
    color: string;
  }[]>([]);
  protected readonly size = 300
  protected readonly thickness = 40
  private readonly radius = this.size / 2;
  private readonly baseInnerRadius = this.radius - this.thickness;
  private currentAngle = -Math.PI / 2; // Comenzamos desde arriba (-90 grados)

  protected readonly total = computed(() => this.data().reduce((acc, cur) => acc + cur.value, 0))
  protected paths = signal<{ path: string; color: string; }[]>([])


  // Calcular el porcentaje más grande para mostrarlo en el centro
  protected readonly maxPercentage = computed(() => Math.max(...this.data().map((item) => item.value / this.total())));
  protected readonly percentageToShow = computed(() => new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 0,
  }).format(this.maxPercentage()));

  constructor() {
    effect(() => {
      if (this.total() > 0) {
        this.paths.set(this.data().map((item, idx) => this.buildPaths(item, idx)))
      }
    })
  }

  private buildPaths(item: { label: string; value: number; color: string }, idx: number) {
    const percentage = item.value / this.total();
    const angle = 2 * Math.PI * percentage;
    const padding = 0.02; // Espacio entre segmentos
    const radiusArc = 25;

    // Ajustamos el radio interior para cada segmento
    const innerRadius =
      idx === 0
        ? this.baseInnerRadius - this.thickness * 0.15 // El primer segmento es más grueso
        : this.baseInnerRadius;

    // Calcular puntos del arco con padding
    const startAngle = this.currentAngle + padding;
    const endAngle = this.currentAngle + angle - padding;

    // Puntos del arco exterior
    const startX = this.radius + this.radius * Math.cos(startAngle);
    const startY = this.radius + this.radius * Math.sin(startAngle);
    const endX = this.radius + this.radius * Math.cos(endAngle);
    const endY = this.radius + this.radius * Math.sin(endAngle);

    // Puntos del arco interior
    const innerStartX = this.radius + innerRadius * Math.cos(startAngle);
    const innerStartY = this.radius + innerRadius * Math.sin(startAngle);
    const innerEndX = this.radius + innerRadius * Math.cos(endAngle);
    const innerEndY = this.radius + innerRadius * Math.sin(endAngle);

    // Crear path con arcos más pronunciados
    const largeArcFlag = percentage > 0.5 ? 1 : 0;

    // Para el primer segmento, usamos un arco más pronunciado
    const path = [
      `M ${startX} ${startY}`, // Punto inicial
      `A ${this.radius} ${this.radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arco exterior
      `A ${radiusArc} ${radiusArc} 0 0 1 ${innerEndX} ${innerEndY}`, // Curva hacia interior
      `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`, // Arco interior
      `A ${radiusArc} ${radiusArc} 0 0 1 ${startX} ${startY}`, // Curva hacia exterior
      "Z", // Cerrar path
    ].join(" ");

    const result = {
      path,
      color: item.color,
    };

    this.currentAngle += angle;

    return result;
  }
}
