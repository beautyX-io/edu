# RE:FEEEL Technical Specification

## 1. Tech Stack Overview

| Category | Technology |
|----------|------------|
| Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS 3.4 |
| UI Components | shadcn/ui |
| Animation | Framer Motion |
| Icons | Lucide React |
| State Management | React useState/useContext |

## 2. Tailwind Configuration Extensions

```javascript
// tailwind.config.js extensions
{
  theme: {
    extend: {
      colors: {
        // Category colors
        'marketing': '#6B5CE7',
        'branding': '#F5C842',
        'content-coral': '#E87A5D',
        // Highlight colors
        'highlight-purple': '#C4B5FD',
        'highlight-mint': '#A7F3D0',
        // Dark mode
        'dark-bg': '#0A0A0A',
        'dark-card': '#1F1F1F',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
}
```

## 3. Component Inventory

### Shadcn/UI Components (Pre-installed)
- `DropdownMenu` - Category dropdown
- `Button` - Various buttons
- `Card` - Content cards base

### Custom Components

#### Header Component
```typescript
interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}
```

#### Hero Component
```typescript
interface HeroProps {
  // No props needed - static content
}
```

#### CategoryCards Component
```typescript
interface CategoryCardsProps {
  selectedCategory: Category | null;
  onSelectCategory: (category: Category) => void;
}

type Category = 'marketing' | 'branding' | 'content';
```

#### ContentGrid Component
```typescript
interface ContentGridProps {
  category: Category | null;
}

interface ContentItem {
  id: string;
  kitNumber: number;
  title: string;
  description: string;
  tags: string[];
  category: Category;
}
```

#### FooterCTA Component
```typescript
interface FooterCTAProps {
  // No props needed - static content
}
```

## 4. Animation Implementation Plan

| Interaction Name | Tech Choice | Implementation Logic |
|------------------|-------------|---------------------|
| Page Load | Framer Motion | `staggerChildren` container, children fade + slideUp |
| Hero Text Reveal | Framer Motion | `variants` with stagger, y: 20 -> 0, opacity: 0 -> 1 |
| Category Card Hover | Tailwind + CSS | `hover:scale-[1.03]` + `transition-transform duration-300` |
| Category Card Select | Framer Motion | `layoutId` for smooth selection indicator |
| Content Grid Appear | Framer Motion | `AnimatePresence` + stagger children fade/slide |
| Dark Mode Toggle | Tailwind | `dark:` classes + CSS transition on body |
| Dropdown Open | Framer Motion | `initial={{ opacity: 0, y: -8 }}` `animate={{ opacity: 1, y: 0 }}` |
| Button Hover | Tailwind | `hover:opacity-80 active:scale-95 transition-all` |
| Card Hover Lift | Tailwind | `hover:-translate-y-1 hover:shadow-lg transition-all` |

### Animation Timing Specifications

```typescript
// Animation constants
const ANIMATION = {
  duration: {
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
  },
  easing: {
    default: [0.4, 0, 0.2, 1],
    bounce: [0.68, -0.55, 0.265, 1.55],
    smooth: 'easeOut',
  },
  stagger: {
    children: 0.1,
    cards: 0.08,
  },
};
```

## 5. Project File Structure

```
/mnt/okcomputer/output/app/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── CategoryCards.tsx
│   │   ├── ContentGrid.tsx
│   │   ├── FooterCTA.tsx
│   │   └── ui/           # shadcn components
│   ├── hooks/
│   │   └── useDarkMode.ts
│   ├── data/
│   │   └── content.ts    # All content items data
│   ├── types/
│   │   └── index.ts      # TypeScript interfaces
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 6. Package Installation Commands

```bash
# Initialize project
bash /app/.kimi/skills/webapp-building/scripts/init-webapp.sh "RE:FEEEL"

# Install animation library
cd /mnt/okcomputer/output/app && npm install framer-motion

# Install icon library (if not pre-installed)
npm install lucide-react
```

## 7. Data Structure

```typescript
// Content items organized by category
export const contentItems: ContentItem[] = [
  // Marketing
  {
    id: 'marketing-3',
    kitNumber: 3,
    title: '노출이 매출이 되는 3단계',
    description: '조회수를 매출로 바꾸는 전략',
    tags: ['퍼널전략'],
    category: 'marketing',
  },
  // ... more items
];

// Category configuration
export const categories = [
  {
    id: 'marketing',
    label: 'Marketing',
    sublabel: '마케팅',
    color: '#6B5CE7',
    bgColor: 'bg-marketing',
  },
  {
    id: 'branding',
    label: 'Branding',
    sublabel: '브랜딩',
    color: '#F5C842',
    bgColor: 'bg-branding',
  },
  {
    id: 'content',
    label: 'Content',
    sublabel: '콘텐츠',
    color: '#E87A5D',
    bgColor: 'bg-content-coral',
  },
];
```

## 8. Responsive Breakpoints

| Breakpoint | Width | Layout Changes |
|------------|-------|----------------|
| Mobile | < 640px | Single column, stacked cards |
| Tablet | 640px - 1024px | 2 column content grid |
| Desktop | > 1024px | 3 column category cards, 2 column content |

## 9. Accessibility Considerations

- All interactive elements keyboard accessible
- Proper ARIA labels on buttons and dropdowns
- Color contrast meets WCAG 2.1 AA
- `prefers-reduced-motion` support for animations
- Focus visible states on all interactive elements
