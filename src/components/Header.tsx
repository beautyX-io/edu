import { useState } from 'react';
import { ChevronDown, Lock, Moon, Sun } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-background/80 backdrop-blur-sm transition-colors duration-300">
      {/* Logo */}
      <div className="font-bold text-lg tracking-tight text-foreground" style={{ fontFamily: 'Pretendard, sans-serif' }}>
        beautyX
      </div>

      {/* Center - Category Dropdown */}
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-foreground hover:opacity-80 transition-opacity focus:outline-none">
          Category
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} 
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="center" 
          className="min-w-[180px] animate-scale-in"
        >
          <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
            <span className="font-medium">묣 콘텐츠</span>
            <span className="text-xs text-muted-foreground">BX-KIT</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
            <span className="font-medium">풀버전</span>
            <span className="text-xs text-muted-foreground">유료예정</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex flex-col items-start py-2 cursor-pointer">
            <span className="font-medium">브랜딩 클래스</span>
            <span className="text-xs text-muted-foreground">출시예정</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Right - Icons */}
      <div className="flex items-center gap-2">
        <button 
          className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none"
          aria-label="Lock"
        >
          <Lock className="w-5 h-5 text-foreground" />
        </button>
        <button 
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-muted transition-colors focus:outline-none"
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-foreground transition-transform duration-300 rotate-0" />
          ) : (
            <Moon className="w-5 h-5 text-foreground transition-transform duration-300" />
          )}
        </button>
      </div>
    </header>
  );
}
