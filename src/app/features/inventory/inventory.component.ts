import { Component, inject, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { MockDataService } from '../../services/mock-data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [DecimalPipe, TranslatePipe],
  templateUrl: './inventory.component.html'
})
export class InventoryComponent {
  mockData = inject(MockDataService);
  translation = inject(TranslationService);

  searchQuery = signal('');

  filteredProducts = computed(() => {
    const products = this.mockData.products();
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return products;
    return products.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.nameAr.includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  });
}
