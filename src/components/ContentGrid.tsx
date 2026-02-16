import { useEffect, useState } from 'react';
import type { Category, ContentItem } from '@/types';
import { contentItems } from '@/data/content';

interface ContentGridProps {
  category: Category | null;
}

export function ContentGrid({ category }: ContentGridProps) {
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (category) {
      const items = contentItems.filter(item => item.category === category);
      setFilteredItems(items);
      setIsVisible(false);
      // Trigger animation after a short delay
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setFilteredItems([]);
      setIsVisible(false);
    }
  }, [category]);

  if (!category) return null;

  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredItems.map((item, index) => {
            const CardWrapper = item.link ? 'a' : 'div';
            const linkProps = item.link ? {
              href: item.link,
              target: '_blank',
              rel: 'noopener noreferrer'
            } : {};
            
            return (
              <CardWrapper
                key={item.id}
                {...linkProps}
                className={`
                  group relative p-6 rounded-2xl border
                  bg-card border-border hover:border-muted-foreground/30
                  transition-all duration-300 ease-out
                  hover:-translate-y-1 hover:shadow-lg
                  cursor-pointer
                  ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}
                style={{
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                }}
              >
              {/* KIT Number */}
              <div className="text-xs font-semibold text-muted-foreground mb-3">
                {item.category === 'marketing' && item.kitNumber === 1 
                  ? `M-KIT${item.kitNumber}`
                  : `BX-KIT${item.kitNumber}`}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {item.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </CardWrapper>
          );
          })}
        </div>
      </div>
    </section>
  );
}
