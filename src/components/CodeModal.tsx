import { useState } from 'react';
import { X, Instagram } from 'lucide-react';

interface CodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (code: string) => void;
  isMasterUnlock?: boolean;
}

export function CodeModal({ isOpen, onClose, onSubmit, isMasterUnlock = false }: CodeModalProps) {
  const [code, setCode] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(code);
    setCode('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background/95 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full shadow-2xl">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">🔒</span>
          <h2 className="text-xl font-bold text-foreground">
            {isMasterUnlock ? '전체 잠금 해제' : '코드 입력'}
          </h2>
        </div>

        {/* Input */}
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="코드를 입력하세요"
          className="w-full px-4 py-3 mb-4 rounded-xl bg-muted text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-highlight-purple"
          autoFocus
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          className="w-full py-3 rounded-xl bg-highlight-purple hover:brightness-110 text-white font-medium transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          확인
        </button>

        {/* Instagram link */}
        <div className="mt-6 pt-6 border-t border-border">
          <a
            href="https://www.instagram.com/beautyX.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>아직 공개 전입니다</span>
          </a>
        </div>
      </div>
    </div>
  );
}
