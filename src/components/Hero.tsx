import { useEffect, useState } from 'react';

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="pt-24 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Subtitle */}
        <p 
          className={`text-sm text-muted-foreground mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          beautyX: Beauty Content Marketing
        </p>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight text-foreground">
          <span 
            className={`block mb-2 transition-all duration-500 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            콘텐츠가{' '}
            <span className="inline-block bg-highlight-purple dark:bg-highlight-purple/80 px-2 py-0.5 rounded-lg">
              매출
            </span>
            이 되는
          </span>
          <span 
            className={`block transition-all duration-500 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            뷰티샵의 마케팅{' '}
            <span className="inline-block bg-highlight-mint dark:bg-highlight-mint/80 px-2 py-0.5 rounded-lg">
              공식
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
