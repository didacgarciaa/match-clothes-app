"use client"

import { useSearchParams } from 'next/navigation'
import Layout from '@/components/layout/Layout'
import { colors } from '@/lib/config/colors'

export default function VirtualTryOnPage() {
  const searchParams = useSearchParams()
  const product = searchParams.get('product') || ''
  const image = searchParams.get('image') || ''

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-8 text-center" style={{ color: colors.text }}>
            Virtual Try On
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundLight }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                  Upload A Photo of Yourself
                </h2>
                <div className="border-2 border-dashed rounded-lg p-8 text-center" style={{ borderColor: colors.border.light }}>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer inline-block"
                  >
                    <div className="space-y-2">
                      <svg
                        className="mx-auto h-12 w-12"
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

              <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundLight }}>
                <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                  Select Clothing Item
                </h2>
                <div className="space-y-4">
                  <div className="border rounded-lg overflow-hidden" style={{ borderColor: colors.border.light }}>
                    <div className="aspect-video bg-gray-100">
                      {image ? (
                        <img 
                          src={image} 
                          alt="Clothing Item" 
                          className="w-full h-full object-contain"
                          id="garment-preview"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <p style={{ color: colors.textLight }}>No image selected</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: colors.text }}>
                      Garment Type
                    </label>
                    <select 
                      className="w-full p-2 border rounded-md" 
                      style={{ borderColor: colors.border.light }}
                    >
                      <option value="">Select garment type</option>
                      <option value="top">Top (T-shirts, Shirts, Blouses)</option>
                      <option value="bottom">Bottom (Pants, Skirts, Shorts)</option>
                      <option value="fullbody">Full Body (Dresses, Jumpsuits)</option>
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      id="garment-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Handle the file upload - you would implement your actual upload logic here
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            if (event.target?.result) {
                              // Update the garment image preview
                              const garmentImg = document.querySelector('#garment-preview') as HTMLImageElement;
                              if (garmentImg) {
                                garmentImg.src = event.target.result as string;
                              }
                            }
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <label
                      htmlFor="garment-upload"
                      className="cursor-pointer inline-block px-4 py-2 border rounded-md transition-colors duration-200 hover:bg-gray-50"
                      style={{ 
                        borderColor: colors.primary,
                        color: colors.primary
                      }}
                    >
                      Upload Different Garment
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-lg" style={{ backgroundColor: colors.backgroundLight }}>
              <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.primary }}>
                Preview
              </h2>
              <div className="aspect-[3/4] rounded-lg border-2 border-dashed flex items-center justify-center mb-4" style={{ borderColor: colors.border.light }}>
                <p className="text-center" style={{ color: colors.textLight }}>
                  Your virtual try-on preview will appear here
                </p>
              </div>
              <div className="flex justify-center">
                <button
                  className="px-6 py-3 rounded-lg font-medium text-white transition-colors duration-200"
                  style={{ backgroundColor: colors.primary }}
                >
                  Try On
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
} 