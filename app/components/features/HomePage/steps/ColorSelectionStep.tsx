import { colors } from '@/lib/config/colors';
import { Color } from '@/lib/types';

interface ColorSelectionStepProps {
  colorAnalysis: { dominantColors: Color[] } | null;
  onColorSelection: (color: Color) => void;
}

export default function ColorSelectionStep({ colorAnalysis, onColorSelection }: ColorSelectionStepProps) {
  if (!colorAnalysis || colorAnalysis.dominantColors.length === 0) return null;
  
  return (
    <div className="mt-8 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: colors.text }}>
        Select the main color you want to match:
      </h3>
      <div className="flex flex-wrap gap-4 justify-center">
        {colorAnalysis.dominantColors.map((color, index) => (
          <button
            key={index}
            className="p-4 rounded-lg flex flex-col items-center transition-transform hover:scale-105"
            style={{ 
              backgroundColor: color.hex,
              border: '2px solid #eee',
              width: '150px',
              height: '150px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onClick={() => onColorSelection(color)}
          >
            <div className="w-16 h-16 rounded-full mb-2" style={{ backgroundColor: color.hex }}></div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${color.isLight ? 'text-black bg-white bg-opacity-75' : 'text-white bg-black bg-opacity-50'}`}>
              {color.name} ({color.percentage}%)
            </span>
          </button>
        ))}
      </div>
    </div>
  );
} 