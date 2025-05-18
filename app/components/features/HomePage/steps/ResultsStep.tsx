import { colors } from '@/lib/config/colors';
import { Color } from '@/lib/types';

interface ResultsStepProps {
  selectedColor: Color;
  selectedCombination: { type: string; colors: string[] } | null;
  selectedClothingType: string;
}

export default function ResultsStep({
  selectedColor,
  selectedCombination,
  selectedClothingType
}: ResultsStepProps) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-4 text-left" style={{ color: colors.text }}>
        Color Analysis
      </h3>
      
      <div className="flex flex-col gap-6">
        <div>
          <p className="font-medium mb-2 text-left" style={{ color: colors.text }}>Selected Color:</p>
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: selectedColor.hex }}>
            <div className="w-8 h-8 rounded-full" style={{ backgroundColor: selectedColor.hex }}></div>
            <span className={selectedColor.isLight ? 'text-black font-medium' : 'text-white font-medium'}>
              {selectedColor.name} ({selectedColor.percentage}%)
            </span>
          </div>
        </div>
        
        {selectedCombination && (
          <div>
            <p className="font-medium mb-2 text-left" style={{ color: colors.text }}>
              {selectedCombination.type} Combination
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedCombination.colors.map((color, index) => (
                <div 
                  key={index} 
                  className="w-8 h-8 rounded-full border border-gray-200" 
                  style={{ backgroundColor: color }}
                  title={`Color ${index + 1}`}
                ></div>
              ))}
            </div>
          </div>
        )}
        
        {selectedClothingType && (
          <div className='w-full'>
            <p className="font-medium mb-2 text-left" style={{ color: colors.text }}>Looking for:</p>
            <div className="flex justify-start w-full">
              <div className="px-3 py-1 rounded bg-gray-100 inline-block" style={{ fontWeight: 'bold' }}>
                {selectedClothingType}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='w-full mt-4 text-left'>
        <a 
          href="#upload-another" 
          className='mt-6 text-base font-medium text-left inline-flex items-center group relative'
          style={{ 
            color: colors.text,
            textDecoration: 'none'
          }}
        >
          <svg 
            className="mr-1 w-4 h-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
          See Recomendations
          <span 
            className="absolute left-0 bottom-0 rounded-full block h-[1.5px] w-full bg-black origin-center transform scale-x-0 transition-all duration-300 ease-out group-hover:scale-x-100"
            style={{
              transformOrigin: 'center',
              bottom: '-2px'
            }}
          ></span>
        </a>
      </div>
    </>
  );
} 