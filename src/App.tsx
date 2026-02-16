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
  const [isAllUnlocked, setIsAllUnlocked] = useState(false);

  // Initialize with light mode by default
  useEffect(() => {
    setIsDarkMode(false);
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

  const handleMasterUnlock = () => {
    setIsAllUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        onMasterUnlock={handleMasterUnlock}
      />
      
      <main className="pb-16">
        <Hero />
        <CategoryCards 
          selectedCategory={selectedCategory} 
          onSelectCategory={handleSelectCategory} 
        />
        
        {!selectedCategory && <InstructionText />}
        
        <ContentGrid 
          category={selectedCategory}
          isAllUnlocked={isAllUnlocked}
        />
        
        <FooterCTA />
      </main>
    </div>
  );
}

export default App;
