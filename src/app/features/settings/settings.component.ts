import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { MockDataService } from '../../services/mock-data.service';
import { TranslationService } from '../../core/services/translation.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './settings.component.html'
})
export class SettingsComponent {
  translation = inject(TranslationService);
  mockData = inject(MockDataService);

  owners = this.mockData.getStoreOwners();
  currentOwner = this.owners[0];

  setLanguage(lang: 'en' | 'ar'): void {
    this.translation.setLanguage(lang);
  }
}
