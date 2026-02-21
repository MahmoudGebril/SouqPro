import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, TranslatePipe],
  templateUrl: './main-layout.component.html'
})
export class MainLayoutComponent {
  translation = inject(TranslationService);

  setLanguage(lang: 'en' | 'ar'): void {
    this.translation.setLanguage(lang);
  }
}
