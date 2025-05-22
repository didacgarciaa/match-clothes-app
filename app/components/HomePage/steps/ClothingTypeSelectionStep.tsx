import { colors } from '@/lib/config/colors';
import { useState } from 'react';

interface ClothingTypeSelectionStepProps {
  selectedCombination: { type: string; colors: string[] } | null;
  onClothingTypeSelection: (type: string) => void;
}

const clothingTypes = [
  'Tee', 'Jeans', 'Hoodie', 'Shorts', 'Dress', 'Skirt', 'Jacket', 'Shoes'
];

export default function ClothingTypeSelectionStep({
  selectedCombination,
  onClothingTypeSelection
}: ClothingTypeSelectionStepProps) {
  const [selectedType, setSelectedType] = useState<string>('');

  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
    onClothingTypeSelection(type);
  };

  if (!selectedCombination) return null;
  
  return (
    <div className="mt-8 p-6 rounded-lg bg-white">
      <h3 className="text-xl font-semibold mb-4 text-center" style={{ color: colors.text }}>
        What type of clothing are you looking for?
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {clothingTypes.map((type, index) => (
          <div key={index} className="relative group w-fit mx-auto my-2">
            <button
              className="rounded-lg flex flex-col items-center justify-center transition-all"
              onClick={() => handleTypeSelection(type)}
            >
              {type}
            </button>
            <span 
              className="absolute left-0 bottom-0 rounded-full block h-[1.5px] w-full bg-black origin-center transform scale-x-0 transition-all duration-300 ease-out group-hover:scale-x-100"
              style={{
                transformOrigin: 'center',
                bottom: '-2px'
              }}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
} 