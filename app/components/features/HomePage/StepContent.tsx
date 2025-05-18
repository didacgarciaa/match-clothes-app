import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '@/lib/config/colors';
import ColorSelectionStep from './steps/ColorSelectionStep';
import CombinationSelectionStep from './steps/CombinationSelectionStep';
import ClothingTypeSelectionStep from './steps/ClothingTypeSelectionStep';
import ResultsStep from './steps/ResultsStep';
import BackButton from './BackButton';

interface StepContentProps {
  step: 'upload' | 'selectColor' | 'selectCombination' | 'selectClothingType' | 'results';
  isProcessing: boolean;
  colorAnalysis: any;
  selectedColor: any;
  colorCombinations: any[];
  selectedCombination: any;
  selectedClothingType: string;
  onColorSelection: (color: any) => void;
  onCombinationSelection: (combination: any) => void;
  onClothingTypeSelection: (type: string) => void;
  onBack: () => void;
  showResults: boolean;
  className?: string;
}

export default function StepContent({
  step,
  isProcessing,
  colorAnalysis,
  selectedColor,
  colorCombinations,
  selectedCombination,
  selectedClothingType,
  onColorSelection,
  onCombinationSelection,
  onClothingTypeSelection,
  onBack,
  showResults,
  className = ''
}: StepContentProps) {
  return (
    <div className={`flex-1 min-h-[500px] mt-4 md:mt-4 rounded-xl shadow-lg relative ${className}`} 
      style={{ backgroundColor: colors.background, overflow: 'hidden' }}>
      <BackButton step={step} onBack={onBack} />
      
      <AnimatePresence>
        {isProcessing && (
          <motion.div 
            className="flex flex-col items-center justify-center h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 border-4 rounded-full animate-spin mb-4" style={{ 
              borderColor: `${colors.primary} transparent transparent transparent` 
            }}></div>
            <p style={{ color: colors.text }}>
              {step === 'upload' ? 'Analyzing your item...' : 'Getting suggestions...'}
            </p>
          </motion.div>
        )}
        
        {step === 'selectColor' && !isProcessing && (
          <div className="h-full flex flex-col p-6">
            <ColorSelectionStep 
              colorAnalysis={colorAnalysis}
              onColorSelection={onColorSelection}
            />
          </div>
        )}
        
        {step === 'selectCombination' && !isProcessing && (
          <div className="h-full flex flex-col p-6">
            <CombinationSelectionStep 
              selectedColor={selectedColor}
              colorCombinations={colorCombinations}
              onCombinationSelection={onCombinationSelection}
            />
          </div>
        )}
        
        {step === 'selectClothingType' && !isProcessing && (
          <div className="h-full flex flex-col p-6">
            <ClothingTypeSelectionStep 
              selectedCombination={selectedCombination}
              onClothingTypeSelection={onClothingTypeSelection}
            />
          </div>
        )}
        
        {step === 'results' && showResults && selectedColor && (
          <div className="h-full flex mt-10 flex-col p-10" style={{ backgroundColor: colors.background}}>
            <ResultsStep 
              selectedColor={selectedColor}
              selectedCombination={selectedCombination}
              selectedClothingType={selectedClothingType}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  );
} 