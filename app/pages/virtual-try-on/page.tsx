"use client"

import { useSearchParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { colors } from '@/lib/config/colors'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function VirtualTryOnPage() {
  const searchParams = useSearchParams()
  const product = searchParams.get('product') || ''
  const image = searchParams.get('image') || ''
  const [modelImage, setModelImage] = useState<string>('')
  const [garmentImage, setGarmentImage] = useState<string>(image)
  const [garmentType, setGarmentType] = useState<string>('')
  const [previewImage, setPreviewImage] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const handleTryOn = async () => {
    if (!modelImage || !garmentImage || !garmentType) {
      alert('Please upload both images and select a garment type')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/tryon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          modelImage,
          garmentImage,
          category: garmentType,
        }),
      })

      const data = await response.json()
      if (data.error) {
        throw new Error(data.error)
      }
      setPreviewImage(data.image)
      setCurrentStep(3)
    } catch (error) {
      alert('Error generating try-on preview: ' + error)
    } finally {
      setIsLoading(false)
    }
  }

  const steps = [
    {
      number: 1,
      title: "Upload Your Photo",
      description: "Upload a clear photo of yourself to try on the garment"
    },
    {
      number: 2,
      title: "Select Garment",
      description: "Choose the garment you want to try on"
    },
    {
      number: 3,
      title: "Preview Result",
      description: "See how the garment looks on you"
    }
  ]

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center mx-5 mb-12">
            <h1 className="text-4xl font-bold text-center space-x-2">
              <span style={{ color: colors.text }}>Virtual</span>
              <span style={{ color: colors.primary }}>Try</span>
              <span style={{ color: colors.text }}>On</span>
            </h1>
          </div>

          <div className="flex justify-center mb-12">
            <div className="flex space-x-8">
              {steps.map((step) => (
                <div
                  key={step.number}
                  className="flex items-center"
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold transition-colors duration-200 ${
                      currentStep >= step.number
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    style={{
                      backgroundColor: currentStep >= step.number ? colors.primary : undefined
                    }}
                  >
                    {step.number}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium" style={{ color: colors.text }}>
                      {step.title}
                    </h3>
                    <p className="text-sm" style={{ color: colors.textLight }}>
                      {step.description}
                    </p>
                  </div>
                  {step.number < steps.length && (
                    <div className="w-16 h-0.5 mx-4" style={{ backgroundColor: colors.border.light }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                    Upload Your Photo
                  </h2>
                  <div className="h-[600px] rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden" style={{ borderColor: colors.border.light }}>
                    <div id="photo-upload-container" className="p-8 text-center w-full h-full flex items-center justify-center">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="photo-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (event.target?.result) {
                                const photoContainer = document.querySelector('#photo-upload-container');
                                if (photoContainer) {
                                  photoContainer.innerHTML = `
                                    <img 
                                      src="${event.target.result}" 
                                      alt="Uploaded Photo" 
                                      class="w-4/5 h-4/5 object-contain rounded-lg"
                                    />
                                  `;
                                  setModelImage(event.target.result as string)
                                }
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                      <label
                        htmlFor="photo-upload"
                        className="cursor-pointer inline-block"
                      >
                        <div className="space-y-4">
                          <svg
                            className="mx-auto h-16 w-16"
                            style={{ color: colors.textLight }}
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <div className="text-sm" style={{ color: colors.textLight }}>
                            <span className="font-medium" style={{ color: colors.primary }}>
                              Click to upload
                            </span> or drag and drop
                          </div>
                          <p className="text-xs" style={{ color: colors.textLight }}>
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => setCurrentStep(2)}
                      disabled={!modelImage}
                      className="px-6 py-3 rounded-lg font-medium text-white hover:translate-y-[2px] transition-all duration-200 ease-in-out disabled:opacity-50"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Next Step
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                    Select Garment
                  </h2>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div className="h-[300px] rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden" style={{ borderColor: colors.border.light }}>
                        {garmentImage ? (
                          <div className="w-full h-full flex items-center justify-center">
                            <img 
                              src={garmentImage} 
                              alt="Clothing Item" 
                              className="max-w-[80%] max-h-[80%] object-contain"
                              id="garment-preview"
                            />
                          </div>
                        ) : (
                          <div id="garment-container" className="p-8 text-center">
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id="garment-upload"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onload = (event) => {
                                    if (event.target?.result) {
                                      setGarmentImage(event.target.result as string);
                                    }
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                            <label
                              htmlFor="garment-upload"
                              className="cursor-pointer inline-block"
                            >
                              <div className="space-y-4">
                                <svg
                                  className="mx-auto h-16 w-16"
                                  style={{ color: colors.textLight }}
                                  stroke="currentColor"
                                  fill="none"
                                  viewBox="0 0 48 48"
                                >
                                  <path
                                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                                <div className="text-sm" style={{ color: colors.textLight }}>
                                  <span className="font-medium" style={{ color: colors.primary }}>
                                    Click to upload
                                  </span> or drag and drop
                                </div>
                                <p className="text-xs" style={{ color: colors.textLight }}>
                                  PNG, JPG, GIF up to 10MB
                                </p>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          id="garment-upload-change"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                if (event.target?.result) {
                                  setGarmentImage(event.target.result as string);
                                }
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                        <label
                          htmlFor="garment-upload-change"
                          className="w-full px-4 py-3 border rounded-lg hover:translate-y-[2px] transition-all duration-200 ease-in-out cursor-pointer inline-block text-center"
                          style={{ 
                            backgroundColor: colors.primary,
                            color: 'white'
                          }}
                        >
                          Change Garment
                        </label>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: colors.text }}>
                          Garment Type
                        </label>
                        <select 
                          className="w-full p-3 border rounded-lg" 
                          style={{ borderColor: colors.border.light }}
                          value={garmentType}
                          onChange={(e) => setGarmentType(e.target.value)}
                        >
                          <option value="">Select garment type</option>
                          <option value="tops">Top (T-shirts, Shirts, Blouses)</option>
                          <option value="bottoms">Bottom (Pants, Skirts, Shorts)</option>
                          <option value="fullbody">Full Body (Dresses, Jumpsuits)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(1)}
                      className="px-6 py-3 rounded-lg font-medium hover:translate-y-[2px] transition-all duration-200 ease-in-out"
                      style={{ 
                        backgroundColor: colors.background,
                        color: colors.text
                      }}
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={handleTryOn}
                      disabled={!garmentImage || !garmentType || isLoading}
                      className="px-6 py-3 rounded-lg font-medium text-white hover:translate-y-[2px] transition-all duration-200 ease-in-out disabled:opacity-50"
                      style={{ backgroundColor: colors.primary }}
                    >
                      {isLoading ? 'Generating...' : 'Generate Preview'}
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold" style={{ color: colors.text }}>
                    Preview Result
                  </h2>
                  <div className="h-[500px] rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden" style={{ borderColor: colors.border.light }}>
                    {previewImage ? (
                      <img 
                        src={previewImage} 
                        alt="Try-on Preview" 
                        className="max-w-[80%] max-h-[80%] object-contain"
                      />
                    ) : (
                      <p className="text-center" style={{ color: colors.textLight }}>
                        Your virtual try-on preview will appear here
                      </p>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-lg font-medium hover:translate-y-[2px] transition-all duration-200 ease-in-out"
                      style={{ 
                        backgroundColor: colors.background,
                        color: colors.text
                      }}
                    >
                      Previous Step
                    </button>
                    <button
                      onClick={() => {
                        setCurrentStep(1)
                        setModelImage('')
                        setGarmentImage('')
                        setGarmentType('')
                        setPreviewImage('')
                      }}
                      className="px-6 py-3 rounded-lg font-medium text-white hover:translate-y-[2px] transition-all duration-200 ease-in-out"
                      style={{ backgroundColor: colors.primary }}
                    >
                      Try Another
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 