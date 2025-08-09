import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'line-chart',
  imports: [],
  templateUrl: './line-chart.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LineChartComponent {
  data = input<{ value: number, label: string }[]>([]);
  protected readonly height = 300
  protected readonly width = 420
  protected readonly padding = 0
  protected readonly chartWidth = this.width - this.padding * 2;
  protected readonly chartHeight = this.height - this.padding * 2;

  protected readonly value = computed(() => this.data().map(item => item.value))
  protected readonly maxValue = computed(() => Math.max(...this.value()))
  protected readonly minValue = computed(() => Math.min(...this.value()))
  protected readonly valueRange = computed(() => this.maxValue() - this.minValue())
  protected readonly linePath = computed(() => this.data()
    .map((point, index) => {
      const x = this.scaleX(index);
      const y = this.scaleY(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" "))

  scaleX(index: number) {
    return (index / (this.data().length - 1)) * this.chartWidth + this.padding;
  };

  scaleY(value: number) {
    return (
      this.chartHeight - ((value - this.minValue()) / this.valueRange()) * this.chartHeight + this.padding
    );
  };
}
