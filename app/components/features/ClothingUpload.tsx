import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { colors } from '@/lib/config/colors'

interface ClothingUploadProps {
  onImageUpload: (imageData: string) => void
}

export default function ClothingUpload({ onImageUpload }: ClothingUploadProps) {
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(result)
        onImageUpload(result)
      }
      reader.readAsDataURL(file)
    }
  }, [onImageUpload])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1
  })

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-semibold ${colors.textClasses.primary}`}>
        Upload Clothing
      </h2>
      
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? colors.border.medium : colors.border.light}
          hover:${colors.border.medium}
          ${colors.backgroundClasses.tertiary}`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative aspect-square w-full max-w-md mx-auto">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-contain rounded-lg"
            />
          </div>
        ) : (
          <div className="space-y-2">
            <p className={`text-lg ${colors.textClasses.secondary}`}>
              {isDragActive ? (
                'Drop the image here'
              ) : (
                'Drag and drop an image here, or click to select'
              )}
            </p>
            <p className={`text-sm ${colors.textClasses.tertiary}`}>
              Supports JPG, PNG, and WebP
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 