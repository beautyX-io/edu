import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function InstructionText() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className={`
        flex flex-col items-center py-8 transition-all duration-500
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
      `}
    >
      <ArrowUp className="w-6 h-6 text-muted-foreground mb-2 animate-bounce" />
      <p className="text-sm text-muted-foreground text-center">
        위에서 카테고리를 선택해주세요
      </p>
    </div>
  );
}
