import { useEffect, useState } from 'react';
import { Instagram } from 'lucide-react';

export function FooterCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div 
        className={`
          max-w-md mx-auto text-center transition-all duration-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        {/* CTA Text */}
        <p className="text-base font-medium text-foreground mb-4">
          릴스에서 <span className="font-bold">묣 코드</span>를 받아보세요!
        </p>

        {/* Instagram Button */}
        <a
          href="https://www.instagram.com/beautyX.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 px-6 py-3 rounded-full
            bg-gradient-to-r from-highlight-purple to-highlight-mint
            text-foreground font-medium text-sm
            transition-all duration-300
            hover:brightness-110 hover:scale-105
            active:scale-95
          "
        >
          <Instagram className="w-5 h-5" />
          @beautyX.io
        </a>
      </div>
    </section>
  );
}
