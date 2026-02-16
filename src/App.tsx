import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { CategoryCards } from '@/components/CategoryCards';
import { InstructionText } from '@/components/InstructionText';
import { ContentGrid } from '@/components/ContentGrid';
import { FooterCTA } from '@/components/FooterCTA';
import type { Category } from '@/types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Initialize dark mode based on system preference
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDark);
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(prev => prev === category ? null : category);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="pb-16">
        <Hero />
        <CategoryCards 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleSelectCategory} 
        />
        
        {!selectedCategory && <InstructionText />}
        
        <ContentGrid category={selectedCategory} />
        
        <FooterCTA />
      </main>
    </div>
  );
}

export default App;
