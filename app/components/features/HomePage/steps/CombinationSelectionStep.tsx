import { colors } from '@/lib/config/colors';
import { Color } from '@/lib/types';

interface CombinationSelectionStepProps {
  selectedColor: Color | null;
  colorCombinations: { type: string; colors: string[] }[];
  onCombinationSelection: (combination: { type: string; colors: string[] }) => void;
}

export default function CombinationSelectionStep({
  selectedColor,
  colorCombinations,
  onCombinationSelection
}: CombinationSelectionStepProps) {
  if (!selectedColor || colorCombinations.length === 0) return null;
  
  return (
    <div className="mt-8 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: colors.text }}>
        Choose a color combination:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {colorCombinations.map((combination, index) => (
          <button
            key={index}
            className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col items-center"
            onClick={() => onCombinationSelection(combination)}
          >
            <h4 className="font-medium mb-2" style={{ color: colors.text }}>{combination.type}</h4>
            <div className="flex flex-wrap justify-center gap-2 mb-2 w-full">
              {combination.colors.slice(0, 5).map((color, idx) => (
                <div 
                  key={idx} 
                  className="w-8 h-8 rounded-full border-2" 
                  style={{ backgroundColor: color, borderColor: '#eee' }}
                />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
} 