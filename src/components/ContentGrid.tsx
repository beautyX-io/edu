import { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Lock } from 'lucide-react';
import type { Category, ContentItem } from '@/types';
import { contentItems } from '@/data/content';
import { CodeModal } from './CodeModal';

interface ContentGridProps {
  category: Category | null;
  isAllUnlocked: boolean;
}

function getKitLabel(item: ContentItem): string {
  if (item.category === 'marketing' && item.kitNumber === 1) return `M-KIT${item.kitNumber}`;
  if (item.category === 'branding' && item.kitNumber === 1) return `B-NP-KIT${item.kitNumber}`;
  if (item.category === 'branding' && item.kitNumber === 2) return `B-S-KIT${item.kitNumber}`;
  return `BX-KIT${item.kitNumber}`;
}

export function ContentGrid({ category, isAllUnlocked }: ContentGridProps) {
  const [filteredItems, setFilteredItems] = useState<ContentItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [unlockedItems, setUnlockedItems] = useState<Set<string>>(new Set());
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (category) {
      const items = contentItems.filter(item => item.category === category);
      setFilteredItems(items);
      setIsVisible(false);
      setTimeout(() => setIsVisible(true), 50);
    } else {
      setFilteredItems([]);
      setIsVisible(false);
    }
  }, [category]);

  const showToast = (message: string) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast(message);
    toastTimerRef.current = setTimeout(() => setToast(null), 3000);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleItemClick = (item: ContentItem) => {
    const isUnlocked = !item.isLocked || unlockedItems.has(item.id) || isAllUnlocked;
    if (!isUnlocked) {
      setSelectedItem(item);
      setShowCodeModal(true);
    } else if (item.link) {
      window.open(item.link, '_blank');
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (selectedItem && selectedItem.code === code) {
      setUnlockedItems(prev => new Set([...prev, selectedItem.id]));
      setShowCodeModal(false);
      showToast(`${getKitLabel(selectedItem)}이 열렸습니다!`);
    } else {
      alert('코드가 올바르지 않습니다.');
    }
  };

  if (!category) return null;

  const renderCard = (item: ContentItem, index: number, extraClass = '') => {
    const isLocked = !!(item.isLocked && !unlockedItems.has(item.id) && !isAllUnlocked);
    const isUnlocked = !isLocked;
    const hasLink = !!item.link;

    return (
      <button
        key={item.id}
        onClick={() => handleItemClick(item)}
        className={`
          relative p-6 rounded-2xl border
          bg-card border-border
          transition-all duration-300 ease-out
          text-left group
          ${isUnlocked && hasLink ? 'hover:-translate-y-1 hover:shadow-lg hover:border-muted-foreground/30 cursor-pointer' : ''}
          ${isLocked ? 'opacity-60 cursor-pointer hover:opacity-75' : ''}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          ${extraClass}
        `}
        style={{
          transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
        }}
      >
        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl">
            <div className="p-4 rounded-full bg-background/80 backdrop-blur-sm shadow-sm">
              <Lock className="w-8 h-8 text-muted-foreground" />
            </div>
          </div>
        )}

        {/* KIT Number */}
        <div className={`text-xs font-semibold mb-3 ${isLocked ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}>
          {getKitLabel(item)}
        </div>

        {/* Title */}
        <h3 className={`text-base font-bold mb-3 leading-tight ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
          {item.title}
        </h3>

        {/* OPEN button — shown only when unlocked and has link */}
        {isUnlocked && hasLink && (
          <div className="mb-3">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold shadow-sm transition-colors">
              ✨ OPEN
            </span>
          </div>
        )}

        {/* Description */}
        <p className={`text-sm mb-4 leading-relaxed ${isLocked ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className={`text-xs ${isLocked ? 'text-muted-foreground/50' : 'text-muted-foreground'}`}
            >
              #{tag}
            </span>
          ))}
        </div>
      </button>
    );
  };

  return (
    <section className="py-8 relative">
      {/* Mobile: Horizontal scroll with arrows */}
      <div className="lg:hidden relative">
        {/* Left scroll button */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-all"
        >
          <ChevronLeft className="w-5 h-5 text-foreground" />
        </button>

        {/* Right scroll button */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/80 backdrop-blur-sm shadow-lg hover:bg-background transition-all"
        >
          <ChevronRight className="w-5 h-5 text-foreground" />
        </button>

        {/* Content cards - Mobile */}
        <div
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide px-4 sm:px-6"
        >
          <div className="flex gap-4 pb-2">
            {filteredItems.map((item, index) =>
              renderCard(item, index, 'flex-shrink-0 w-[300px]')
            )}
          </div>
        </div>
      </div>

      {/* Desktop: Centered grid */}
      <div className="hidden lg:block max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-2 gap-4">
          {filteredItems.map((item, index) => renderCard(item, index))}
        </div>
      </div>

      <CodeModal
        isOpen={showCodeModal}
        onClose={() => setShowCodeModal(false)}
        onSubmit={handleCodeSubmit}
      />

      {/* Toast notification */}
      <div
        className={`
          fixed bottom-8 left-1/2 -translate-x-1/2 z-50
          flex items-center gap-2 px-5 py-3
          bg-gray-900 dark:bg-gray-100
          text-white dark:text-gray-900
          text-sm font-medium rounded-full shadow-xl
          pointer-events-none
          transition-all duration-300 ease-out
          ${toast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <span>🔓</span>
        <span>{toast}</span>
      </div>
    </section>
  );
}
