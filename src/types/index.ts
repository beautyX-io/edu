export type Category = 'marketing' | 'branding' | 'content';

export interface ContentItem {
  id: string;
  kitNumber: number;
  title: string;
  description: string;
  tags: string[];
  category: Category;
}

export interface CategoryConfig {
  id: Category;
  label: string;
  sublabel: string;
  color: string;
  bgColor: string;
}
