import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { VirtualTryOnResult } from '@/lib/types'
import Image from 'next/image'
import { colors } from '@/lib/config/colors'

interface VirtualTryOnProps {
  selectedClothing: {
    imageUrl: string
    name: string
  }
  onTryOnComplete: (result: { imageUrl: string; confidence: number }) => void
}

export default function VirtualTryOn({ selectedClothing, onTryOnComplete }: VirtualTryOnProps) {
  const [userImage, setUserImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<VirtualTryOnResult | null>(null)

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = () => {
          setUserImage(reader.result as string)
          setResult(null)
        }
        reader.readAsDataURL(file)
      }
    }
  })

  const handleTryOn = async () => {
    if (!userImage) return

    setIsProcessing(true)
    try {
      const mockResult: VirtualTryOnResult = {
        originalImage: userImage,
        tryOnImage: selectedClothing.imageUrl,
        confidence: 0.85
      }
      
      setResult(mockResult)
      onTryOnComplete({
        imageUrl: selectedClothing.imageUrl,
        confidence: 0.85
      })
    } catch (error) {
      console.error('Error during virtual try-on:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${colors.textClasses.primary}`}>
        Virtual Try-On
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`space-y-4 p-6 rounded-xl ${colors.backgroundClasses.tertiary}`}>
          <h3 className={`text-lg font-medium ${colors.textClasses.secondary}`}>
            Selected Item
          </h3>
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <Image
              src={selectedClothing.imageUrl}
              alt={selectedClothing.name}
              fill
              className="object-contain rounded-lg"
            />
          </div>
          <p className={`text-center font-medium ${colors.textClasses.primary}`}>
            {selectedClothing.name}
          </p>
        </div>

        <div className={`space-y-4 p-6 rounded-xl ${colors.backgroundClasses.tertiary}`}>
          <h3 className={`text-lg font-medium ${colors.textClasses.secondary}`}>
            Try-On Result
          </h3>
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <div className={`absolute inset-0 flex items-center justify-center ${colors.textClasses.tertiary}`}>
              Click "Try On" to see the result
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleTryOn}
          disabled={isProcessing}
          className={`px-6 py-3 rounded-lg font-medium transition-colors
            bg-[${colors.primary}] text-white
            hover:bg-[${colors.secondary}]`}
        >
          {isProcessing ? 'Processing...' : 'Try On'}
        </button>
      </div>
    </div>
  )
} 