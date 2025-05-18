import { colors } from '@/lib/config/colors';

interface BackButtonProps {
  step: 'upload' | 'selectColor' | 'selectCombination' | 'selectClothingType' | 'results';
  onBack: () => void;
}

export default function BackButton({ step, onBack }: BackButtonProps) {
  if (step === 'upload') return null;
  
  return (
    <button
      onClick={onBack}
      className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
      style={{ color: colors.text }}
    >
      <svg 
        className="w-6 h-6" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
} 