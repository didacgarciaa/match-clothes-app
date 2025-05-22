'use client'

import { useState } from 'react'
import Layout from './components/layout/Layout'
import { ColorAnalysisService } from '@/lib/services/colorAnalysis'
import { ColorAnalysis, Color } from '@/lib/types'
import { generateSchemes } from '@/lib/services/combineColors'
import HeroSection from './components/HomePage/HeroSection'
import ResultsSection from './components/HomePage/ResultsSection'

type FlowStep = 'upload' | 'selectColor' | 'selectCombination' | 'selectClothingType' | 'results'
type ColorCombination = { type: string, colors: string[] }

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [colorAnalysis, setColorAnalysis] = useState<ColorAnalysis | null>(null)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [colorCombinations, setColorCombinations] = useState<ColorCombination[]>([])
  const [selectedCombination, setSelectedCombination] = useState<ColorCombination | null>(null)
  const [selectedClothingType, setSelectedClothingType] = useState<string>('')
  const [step, setStep] = useState<FlowStep>('upload')

  const resetState = () => {
    setUploadedImage(null)
    setColorAnalysis(null)
    setSelectedColor(null)
    setColorCombinations([])
    setSelectedCombination(null)
    setSelectedClothingType('')
    setShowResults(false)
    setStep('upload')
  }

  const processImage = async (dataUrl: string) => {
    setUploadedImage(dataUrl)
    
    try {
      const colorAnalysisService = ColorAnalysisService.getInstance()
      const analysis = await colorAnalysisService.analyzeImage(dataUrl)
      setColorAnalysis(analysis)
      
      setIsProcessing(false)
      setStep('selectColor')
      console.log('Color analysis complete:', analysis)
    } catch (error) {
      console.error('Error analyzing colors:', error)
      setIsProcessing(false)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsProcessing(true)
      resetState()
      setStep('upload')
      
      const file = e.target.files[0]
      const reader = new FileReader()
      
      reader.onload = async (event) => {
        if (event.target) {
          await processImage(event.target.result as string)
        }
      }
      
      reader.readAsDataURL(file)
    }
  }

  const handleSampleImageSelect = async (imageUrl: string) => {
    setIsProcessing(true)
    resetState()
    setStep('upload')
    
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const reader = new FileReader()
      
      reader.onload = async (event) => {
        if (event.target) {
          await processImage(event.target.result as string)
        }
      }
      
      reader.readAsDataURL(blob)
    } catch (error) {
      console.error('Error loading sample image:', error)
      setIsProcessing(false)
    }
  }

  const handleColorSelection = (color: Color) => {
    setSelectedColor(color)
    
    const schemes = generateSchemes(color.hex)
    const combinations = [
      { type: 'Complementary', colors: [schemes.complementary] },
      { type: 'Analogous', colors: schemes.analogous },
      { type: 'Triadic', colors: schemes.triadic },
      { type: 'Split Complementary', colors: schemes.splitComplementary },
      { type: 'Tetradic', colors: schemes.tetradic }
    ]
    
    setColorCombinations(combinations)
    setStep('selectCombination')
  }

  const handleCombinationSelection = (combination: ColorCombination) => {
    setSelectedCombination(combination)
    setStep('selectClothingType')
  }

  const handleClothingTypeSelection = async (type: string) => {
    setSelectedClothingType(type)
    setIsProcessing(true)
    
    try {
      // No need to do anything else here - the colors will be used in ResultsSection
      setIsProcessing(false)
      setShowResults(true)
      setStep('results')
    } catch (error) {
      console.error('Error processing clothing type selection:', error)
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    switch (step) {
      case 'selectColor':
        setUploadedImage(null)
        setStep('upload')
        break
      case 'selectCombination':
        setStep('selectColor')
        break
      case 'selectClothingType':
        setStep('selectCombination')
        break
      case 'results':
        setStep('selectClothingType')
        break
    }
  }

  return (
    <Layout>
      <HeroSection
        uploadedImage={uploadedImage}
        isProcessing={isProcessing}
        step={step}
        onImageUpload={handleImageUpload}
        onReset={resetState}
        colorAnalysis={colorAnalysis}
        selectedColor={selectedColor}
        colorCombinations={colorCombinations}
        selectedCombination={selectedCombination}
        selectedClothingType={selectedClothingType}
        onColorSelection={handleColorSelection}
        onCombinationSelection={handleCombinationSelection}
        onClothingTypeSelection={handleClothingTypeSelection}
        onBack={handleBack}
        showResults={showResults}
        onSampleImageSelect={handleSampleImageSelect}
      />

      <ResultsSection
        showResults={showResults}
        step={step}
        clotheType={selectedClothingType}
        colorHexCodes={selectedCombination?.colors || []}
      />
    </Layout>
  )
}
