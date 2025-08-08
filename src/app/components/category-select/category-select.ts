import { ChangeDetectionStrategy, Component, input, model, signal } from '@angular/core';
import { Category } from '@app/models/category.model';

@Component({
  selector: 'category-select',
  imports: [],
  templateUrl: './category-select.html',
  styles: `
    :host {
      display: block;
    }

    .active {
      background-color: color-mix(in oklab, #fff 15%, transparent);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorySelectComponent {
  categories = input<Category[]>([]);
  selectedCategory = model<Category | null>(null);
  protected open = signal(false);

  onSelectCategory(category: Category) {
    this.selectedCategory.set(category);
    this.open.set(false);
  }

}
