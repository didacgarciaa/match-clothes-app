import { motion } from 'framer-motion';
import { colors } from '@/lib/config/colors';
import ImageUploader from './ImageUploader';
import StepContent from './StepContent';
import Image from 'next/image';
import { HiBadgeCheck } from "react-icons/hi";
import { Color, ColorAnalysis } from '@/lib/types';

type FlowStep = 'upload' | 'selectColor' | 'selectCombination' | 'selectClothingType' | 'results';
type ColorCombination = { type: string, colors: string[] };

interface HeroSectionProps {
  uploadedImage: string | null;
  isProcessing: boolean;
  step: FlowStep;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReset: () => void;
  colorAnalysis: ColorAnalysis | null;
  selectedColor: Color | null;
  colorCombinations: ColorCombination[];
  selectedCombination: ColorCombination | null;
  selectedClothingType: string;
  onColorSelection: (color: Color) => void;
  onCombinationSelection: (combination: ColorCombination) => void;
  onClothingTypeSelection: (type: string) => void;
  onBack: () => void;
  showResults: boolean;
  onSampleImageSelect?: (imageUrl: string) => void;
}

interface InitialViewProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSampleImageSelect?: (imageUrl: string) => void;
}

const SAMPLE_IMAGES = [
  '/images/foto3.png',
  '/images/foto6.png',
  '/images/foto4.png',
  '/images/foto5.png'
];

const DecorativeElements = () => (
  <>
    <div className="absolute top-20 right-15 w-64 h-64 hover:translate-y-0.5 transition-transform duration-300 ease-in-out">
      <Image 
        src="/images/decorative-curve.svg" 
        alt="" 
        width={256} 
        height={256}
        style={{ opacity: 0.7 }}
      />
    </div>
    <div className="absolute bottom-10 left-15 w-48 h-48 hover:translate-y-0.5 transition-transform duration-300 ease-in-out">
      <Image 
        src="/images/decorative-dot.svg" 
        alt="" 
        width={192} 
        height={192} 
        style={{ opacity: 0.7 }}
      />
    </div>
  </>
);

const InitialView = ({ onImageUpload, onSampleImageSelect }: InitialViewProps) => {
  const handleSampleImageClick = (imageUrl: string) => {
    if (onSampleImageSelect) {
      onSampleImageSelect(imageUrl);
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
      <motion.div 
        className="text-center lg:text-left"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold mb-8" style={{ color: colors.text }}>
          Match <span style={{ color: colors.primary }}>Clothes</span> with AI
        </h1>
        <p className="text-xl mb-10" style={{ color: colors.textLight }}>
          Upload your clothing item and find perfect matches in seconds
        </p>
        
        <motion.div 
          className="mt-8 flex flex-col items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <button 
            className="px-10 py-4 rounded-xl font-medium text-white cursor-pointer inline-block transition-colors duration-200 shadow-lg text-lg
                      hover:translate-y-0.5 transition-transform duration-300 ease-in-out"
            style={{ backgroundColor: colors.primary }}
            onClick={() => document.getElementById('file-upload')?.click()}
          >
            Upload Your Clothing
            <input 
              id="file-upload" 
              name="file-upload" 
              type="file" 
              className="sr-only" 
              accept="image/*" 
              onChange={onImageUpload}
            />
          </button>
          <div className="flex items-center gap-2 mt-5">
            <HiBadgeCheck className="w-5 h-5" />
            <p className="text-sm" style={{ color: colors.textLight }}>
              Instant AI-powered matching
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 flex justify-center"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-8 w-full max-w-sm">
          <ImageUploader
            uploadedImage={null}
            isProcessing={false}
            onImageUpload={onImageUpload}
            onReset={() => {}}
          />
          
          <div className="rounded-3xl p-6 bg-white">
            <div className="text-center">
              <p className="font-medium mb-3 text-lg">No image yet?</p>
              <p className="text-sm text-gray-500 mb-4">Try one of these samples:</p>
              <div className="flex justify-center gap-4 mt-3">
                {SAMPLE_IMAGES.map((imageUrl) => (
                  <div 
                    key={imageUrl}
                    className="w-16 h-16 rounded-lg cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                    onClick={() => handleSampleImageClick(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      alt="Sample clothing"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ProcessView = ({
  uploadedImage,
  isProcessing,
  step,
  onImageUpload,
  onReset,
  colorAnalysis,
  selectedColor,
  colorCombinations,
  selectedCombination,
  selectedClothingType,
  onColorSelection,
  onCombinationSelection,
  onClothingTypeSelection,
  onBack,
  showResults
}: Omit<HeroSectionProps, 'onSampleImageSelect'>) => (
  <motion.div 
    className="max-w-6xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.4 }}
  >
    <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>
      Match <span style={{ color: colors.primary }}>Clothes</span> with AI
    </h1>
    
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-2/5 flex justify-center">
        <ImageUploader
          uploadedImage={uploadedImage}
          isProcessing={isProcessing}
          onImageUpload={onImageUpload}
          onReset={onReset}
        />
      </div>
      
      <div className="md:w-3/5 bg-white rounded-3xl p-6">
        <StepContent
          step={step}
          isProcessing={isProcessing}
          colorAnalysis={colorAnalysis}
          selectedColor={selectedColor}
          colorCombinations={colorCombinations}
          selectedCombination={selectedCombination}
          selectedClothingType={selectedClothingType}
          onColorSelection={onColorSelection}
          onCombinationSelection={onCombinationSelection}
          onClothingTypeSelection={onClothingTypeSelection}
          onBack={onBack}
          showResults={showResults}
        />
      </div>
    </div>
  </motion.div>
);

export default function HeroSection({
  uploadedImage,
  isProcessing,
  step,
  onImageUpload,
  onReset,
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
  onSampleImageSelect
}: HeroSectionProps) {
  return (
    <section className="relative py-15 md:py-15 overflow-hidden">
      <DecorativeElements />
      
      <div className="container mx-auto px-4">
        {!uploadedImage ? (
          <InitialView 
            onImageUpload={onImageUpload} 
            onSampleImageSelect={onSampleImageSelect} 
          />
        ) : (
          <ProcessView
            uploadedImage={uploadedImage}
            isProcessing={isProcessing}
            step={step}
            onImageUpload={onImageUpload}
            onReset={onReset}
            colorAnalysis={colorAnalysis}
            selectedColor={selectedColor}
            colorCombinations={colorCombinations}
            selectedCombination={selectedCombination}
            selectedClothingType={selectedClothingType}
            onColorSelection={onColorSelection}
            onCombinationSelection={onCombinationSelection}
            onClothingTypeSelection={onClothingTypeSelection}
            onBack={onBack}
            showResults={showResults}
          />
        )}
      </div>
    </section>
  );
} 