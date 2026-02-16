import { useEffect, useState } from 'react';
import type { Category } from '@/types';
import { categories } from '@/data/content';

interface CategoryCardsProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

export function CategoryCards({ selectedCategory, onSelectCategory }: CategoryCardsProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`
                relative aspect-square rounded-3xl p-6 flex flex-col items-center justify-center
                transition-all duration-300 ease-out
                hover:scale-[1.03] hover:shadow-xl
                active:scale-[0.98]
                ${category.bgColor}
                ${selectedCategory === category.id ? 'ring-4 ring-offset-2 ring-white/50 dark:ring-white/30' : ''}
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : '0ms',
              }}
            >
              {/* Black dot */}
              <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-black/80" />
              
              {/* Category Label */}
              <span className="text-white text-xl sm:text-2xl font-semibold mb-3">
                {category.label}
              </span>
              
              {/* Sublabel pill */}
              <span className="px-3 py-1 rounded-full bg-black/20 text-white text-xs font-medium">
                {category.sublabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
