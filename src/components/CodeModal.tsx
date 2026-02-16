import { useState } from 'react';
import { createPortal } from 'react-dom';
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

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {/* Backdrop - close on click */}
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-3xl p-8 w-full max-w-[380px] shadow-2xl z-10 mx-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          type="button"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Title */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="text-2xl">🔒</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
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
          className="w-full px-5 py-4 mb-4 rounded-2xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:border-purple-400 dark:focus:border-purple-600 text-base transition-colors"
          autoFocus
        />

        {/* Submit button */}
        <button
          onClick={handleSubmit}
          type="button"
          className="w-full py-4 rounded-2xl bg-purple-500 hover:bg-purple-600 text-white font-semibold transition-all active:scale-[0.98] text-base shadow-md"
        >
          확인
        </button>

        {/* Instagram link */}
        <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href="https://www.instagram.com/beautyX.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span>아직 공개 전입니다</span>
          </a>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
