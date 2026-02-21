import { Component, inject, computed, signal } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { MockDataService } from '../../services/mock-data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [DecimalPipe, DatePipe, TranslatePipe],
  templateUrl: './sales.component.html'
})
export class SalesComponent {
  mockData = inject(MockDataService);
  translation = inject(TranslationService);

  searchQuery = signal('');

  filteredSales = computed(() => {
    const sales = this.mockData.sales();
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return sales;
    return sales.filter(
      s =>
        s.productName.toLowerCase().includes(q) ||
        s.productNameAr.includes(q) ||
        s.id.toLowerCase().includes(q)
    );
  });
}
