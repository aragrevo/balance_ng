import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { Transaction } from '@app/models/transaction.model';
import { Category } from '@app/models/category.model';
import { AppStateService } from '@app/services/app-state.service';

interface MonthlyData {
  month: string;
  amount: number;
  transactionCount: number;
}

interface CategoryData {
  categoryName: string;
  monthlyData: MonthlyData[];
  totalAmount: number;
}

@Component({
  selector: 'bar-chart',
  imports: [],
  templateUrl: './bar-chart.component.html',
  styles: `
    :host {
      display: block;
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarChartComponent {
  transactions = input<Transaction[]>([]);
  categories = input<Category[]>([]);

  private readonly appStateSvc = inject(AppStateService);

  protected readonly chartData = computed(() => {
    const now = new Date();
    const months: { key: string; name: string }[] = [];

    // Generar los últimos 3 meses
    for (let i = 2; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      months.push({
        key: `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`,
        name: date.toLocaleDateString('es-ES', { month: 'short', year: 'numeric' })
      });
    }

    // Filtrar transacciones de los últimos 3 meses
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);
    const recentTransactions = this.transactions().filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate >= threeMonthsAgo && transaction.money === this.appStateSvc.getMoney();
    });

    // Agrupar transacciones por categoría y mes
    const categoryMap = new Map<string, Map<string, { total: number; count: number }>>();

    recentTransactions.forEach(transaction => {
      const categoryName = transaction.description;
      const transactionDate = new Date(transaction.date);
      const monthKey = `${transactionDate.getFullYear()}-${String(transactionDate.getMonth() + 1).padStart(2, '0')}`;
      const amount = Math.abs(transaction.cost);

      if (!categoryMap.has(categoryName)) {
        categoryMap.set(categoryName, new Map());
      }

      const monthMap = categoryMap.get(categoryName)!;
      if (monthMap.has(monthKey)) {
        const existing = monthMap.get(monthKey)!;
        existing.total += amount;
        existing.count += 1;
      } else {
        monthMap.set(monthKey, { total: amount, count: 1 });
      }
    });

    // Convertir a array y calcular totales
    const categoryData: CategoryData[] = Array.from(categoryMap.entries())
      .map(([categoryName, monthMap]) => {
        const monthlyData: MonthlyData[] = months.map(month => {
          const data = monthMap.get(month.key) || { total: 0, count: 0 };
          return {
            month: month.name,
            amount: data.total,
            transactionCount: data.count
          };
        });

        const totalAmount = monthlyData.reduce((sum, data) => sum + data.amount, 0);

        return {
          categoryName: this.categories().find(cat => cat.id === categoryName)?.name || categoryName,
          monthlyData,
          totalAmount
        };
      })
    // .filter(category => category.totalAmount > 0) // Solo categorías con transacciones
    // .sort((a, b) => b. - a.totalAmount)
    // .slice(0, 6); // Mostrar solo las 6 categorías principales

    return categoryData;
  });

  protected readonly maxValue = computed(() => {
    const data = this.chartData();
    const allAmounts = data.flatMap(category =>
      category.monthlyData.map(month => month.amount)
    );
    return Math.max(...allAmounts) || 1;
  });

  protected getBarHeight(value: number): number {
    if (value === 0) return 0;
    return Math.max((value / this.maxValue()) * 100, 3); // Mínimo 3% para visibilidad
  }

  protected formatCurrency(value: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  protected getBarColor(index: number): string {
    const colors = [
      '#37D6A3', // blue
      '#A5B4FC', // emerald
      '#FF6B6B', // amber
    ];
    return colors[index % colors.length];
  }

  protected getMonthColor(monthIndex: number): string {
    const monthColors = [
      '#37D6A3', // blue - mes más antiguo
      '#A5B4FC', // emerald - mes medio
      '#FF6B6B'  // amber - mes más reciente
    ];
    return monthColors[monthIndex % monthColors.length];
  }
}
