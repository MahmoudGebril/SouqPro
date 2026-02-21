import { Injectable, signal, computed } from '@angular/core';

export type Language = 'en' | 'ar';

interface Translations {
  [key: string]: string | Translations;
}

@Injectable({ providedIn: 'root' })
export class TranslationService {
  private currentLang = signal<Language>('en');
  private translations = signal<Record<Language, Translations>>({
    en: {},
    ar: {}
  });

  readonly isRtl = computed(() => this.currentLang() === 'ar');
  readonly lang = this.currentLang.asReadonly();

  constructor() {
    this.loadTranslations();
    document.documentElement.lang = this.currentLang();
    document.documentElement.dir = this.currentLang() === 'ar' ? 'rtl' : 'ltr';
  }

  private async loadTranslations(): Promise<void> {
    const [en, ar] = await Promise.all([
      fetch('/i18n/en.json').then(r => r.json()),
      fetch('/i18n/ar.json').then(r => r.json())
    ]);
    this.translations.set({ en, ar });
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }

  translate(key: string): string {
    const keys = key.split('.');
    const trans = this.translations()[this.currentLang()];

    let value: string | Translations | undefined = trans;
    for (const k of keys) {
      value = (value as Translations)?.[k];
    }
    return typeof value === 'string' ? value : key;
  }

  instant(key: string): string {
    return this.translate(key);
  }
}
