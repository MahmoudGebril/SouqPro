import { Injectable, signal, computed } from '@angular/core';
import { Product, Sale } from '../models';

const CATEGORIES = [
  { key: 'electronics', en: 'Electronics', ar: 'إلكترونيات' },
  { key: 'clothing', en: 'Clothing', ar: 'ملابس' },
  { key: 'perfumes', en: 'Perfumes', ar: 'عطور' },
  { key: 'groceries', en: 'Groceries', ar: 'بقالة' },
  { key: 'accessories', en: 'Accessories', ar: 'إكسسوارات' }
];

const PRODUCT_NAMES: { name: string; nameAr: string; categoryKey: string }[] = [
  { name: 'Eastern Perfume', nameAr: 'عطر شرقي', categoryKey: 'perfumes' },
  { name: 'Cotton Shirt', nameAr: 'قميص قطني', categoryKey: 'clothing' },
  { name: 'Bluetooth Headphones', nameAr: 'سماعة بلوتوث', categoryKey: 'electronics' },
  { name: 'Men\'s Wristwatch', nameAr: 'ساعة يد رجالية', categoryKey: 'accessories' },
  { name: 'Women\'s Handbag', nameAr: 'حقيبة نسائية', categoryKey: 'accessories' },
  { name: 'Wireless Earbuds', nameAr: 'سماعات لاسلكية', categoryKey: 'electronics' },
  { name: 'Silk Scarf', nameAr: 'وشاح حريري', categoryKey: 'clothing' },
  { name: 'Rose Perfume', nameAr: 'عطر وردي', categoryKey: 'perfumes' },
  { name: 'Olive Oil 1L', nameAr: 'زيت زيتون 1 لتر', categoryKey: 'groceries' },
  { name: 'Leather Belt', nameAr: 'حزام جلدي', categoryKey: 'accessories' },
  { name: 'Smartphone Case', nameAr: 'غلاف هاتف ذكي', categoryKey: 'electronics' },
  { name: 'Cotton Pants', nameAr: 'بنطال قطني', categoryKey: 'clothing' },
  { name: 'Oud Perfume', nameAr: 'عطر عود', categoryKey: 'perfumes' },
  { name: 'Organic Honey', nameAr: 'عسل عضوي', categoryKey: 'groceries' },
  { name: 'Sunglasses', nameAr: 'نظارة شمسية', categoryKey: 'accessories' },
  { name: 'Power Bank', nameAr: 'شاحن محمول', categoryKey: 'electronics' },
  { name: 'Abaya', nameAr: 'عباية', categoryKey: 'clothing' },
  { name: 'Bakhoor Set', nameAr: 'طقم بخور', categoryKey: 'perfumes' },
  { name: 'Dates 500g', nameAr: 'تمر 500 جرام', categoryKey: 'groceries' },
  { name: 'Gold Necklace', nameAr: 'عقد ذهبي', categoryKey: 'accessories' },
  { name: 'Tablet Stand', nameAr: 'حامل تابلت', categoryKey: 'electronics' },
  { name: 'Thobe', nameAr: 'ثوب', categoryKey: 'clothing' },
  { name: 'Musk Perfume', nameAr: 'عطر مسك', categoryKey: 'perfumes' },
  { name: 'Arabic Coffee 500g', nameAr: 'قهوة عربية 500 جرام', categoryKey: 'groceries' },
  { name: 'Wallet', nameAr: 'محفظة', categoryKey: 'accessories' },
  { name: 'USB Cable', nameAr: 'كابل USB', categoryKey: 'electronics' },
  { name: 'Shawl', nameAr: 'شال', categoryKey: 'clothing' },
  { name: 'Body Mist', nameAr: 'رذاذ جسم', categoryKey: 'perfumes' },
  { name: 'Tahini 400g', nameAr: 'طحينة 400 جرام', categoryKey: 'groceries' },
  { name: 'Bracelet', nameAr: 'سوار', categoryKey: 'accessories' }
];

const STORE_OWNERS = [
  { name: 'Ahmed Hassan', nameAr: 'أحمد حسن' },
  { name: 'Fatima Al-Sayed', nameAr: 'فاطمة السيد' },
  { name: 'Omar Khaled', nameAr: 'عمر خالد' }
];

@Injectable({ providedIn: 'root' })
export class MockDataService {
  private readonly productsSignal = signal<Product[]>([]);
  private readonly salesSignal = signal<Sale[]>([]);

  readonly products = this.productsSignal.asReadonly();
  readonly sales = this.salesSignal.asReadonly();

  readonly dashboardStats = computed(() => {
    const sales = this.salesSignal();
    const products = this.productsSignal();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const todaySales = sales.filter(s => new Date(s.date) >= today);
    const thisMonth = sales.filter(s => {
      const d = new Date(s.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    });

    const todayRevenue = todaySales.reduce((sum, s) => sum + s.total, 0);
    const monthlyRevenue = thisMonth.reduce((sum, s) => sum + s.total, 0);

    const lowStockCount = products.filter(p => p.stock < 10).length;

    const productSales = new Map<string, { total: number; name: string; nameAr: string }>();
    for (const s of sales) {
      const curr = productSales.get(s.productId) ?? { total: 0, name: s.productName, nameAr: s.productNameAr };
      curr.total += s.quantity;
      productSales.set(s.productId, curr);
    }
    const bestSelling = [...productSales.entries()]
      .sort((a, b) => b[1].total - a[1].total)[0];

    return {
      todaySales: todaySales.length,
      todayRevenue,
      monthlyRevenue,
      lowStockCount,
      bestSelling: bestSelling ? { ...bestSelling[1], productId: bestSelling[0] } : null
    };
  });

  readonly salesPerDayData = computed(() => {
    const sales = this.salesSignal();
    const last30Days = new Map<string, number>();
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      last30Days.set(d.toISOString().slice(0, 10), 0);
    }

    for (const s of sales) {
      const key = new Date(s.date).toISOString().slice(0, 10);
      if (last30Days.has(key)) {
        last30Days.set(key, (last30Days.get(key) ?? 0) + s.quantity);
      }
    }

    return {
      labels: [...last30Days.keys()].map(k => k.slice(5)),
      values: [...last30Days.values()]
    };
  });

  readonly revenueTrendData = computed(() => {
    const sales = this.salesSignal();
    const last30Days = new Map<string, number>();
    const now = new Date();

    for (let i = 29; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      last30Days.set(d.toISOString().slice(0, 10), 0);
    }

    for (const s of sales) {
      const key = new Date(s.date).toISOString().slice(0, 10);
      if (last30Days.has(key)) {
        last30Days.set(key, (last30Days.get(key) ?? 0) + s.total);
      }
    }

    return {
      labels: [...last30Days.keys()].map(k => k.slice(5)),
      values: [...last30Days.values()]
    };
  });

  readonly categoryDistributionData = computed(() => {
    const sales = this.salesSignal();
    const byCategory = new Map<string, number>();

    for (const s of sales) {
      byCategory.set(s.category, (byCategory.get(s.category) ?? 0) + s.total);
    }

    const catNames = CATEGORIES.map(c => c.en);
    return {
      labels: catNames,
      values: catNames.map(c => byCategory.get(c) ?? 0)
    };
  });

  constructor() {
    this.generateData();
  }

  private generateData(): void {
    const products: Product[] = [];

    for (let i = 0; i < 30; i++) {
      const template = PRODUCT_NAMES[i % PRODUCT_NAMES.length];
      const name = `${template.name} #${Math.floor(i / PRODUCT_NAMES.length) + 1}`;
      const nameAr = template.nameAr;
      const categoryKey = template.categoryKey;
      const cat = CATEGORIES.find(c => c.key === categoryKey)!;
      const price = 50 + Math.floor(Math.random() * 450);
      const cost = Math.floor(price * (0.4 + Math.random() * 0.4));
      const stock = Math.floor(Math.random() * 80) + 5;

      products.push({
        id: `prod-${i + 1}`,
        name,
        nameAr,
        category: cat.en,
        categoryKey: cat.key,
        price,
        cost,
        stock,
        sku: `SKU-${1000 + i}`
      });
    }

    this.productsSignal.set(products);

    const sales: Sale[] = [];
    const now = new Date();

    for (let i = 0; i < 250; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const daysAgo = Math.floor(Math.random() * 90);
      const saleDate = new Date(now);
      saleDate.setDate(saleDate.getDate() - daysAgo);
      saleDate.setHours(8 + Math.floor(Math.random() * 10), Math.floor(Math.random() * 60));

      const quantity = Math.floor(Math.random() * 3) + 1;
      const total = product.price * quantity;

      sales.push({
        id: `sale-${i + 1}`,
        productId: product.id,
        productName: product.name,
        productNameAr: product.nameAr,
        category: product.category,
        quantity,
        unitPrice: product.price,
        total,
        date: saleDate
      });
    }

    sales.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    this.salesSignal.set(sales);
  }

  getStoreOwners(): { name: string; nameAr: string }[] {
    return STORE_OWNERS;
  }

  getCategories(): { key: string; en: string; ar: string }[] {
    return CATEGORIES;
  }
}
