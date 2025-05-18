export interface Color {
  name: string
  hex: string
  percentage?: number
  isLight?: boolean
}

export interface ColorAnalysis {
  dominantColors: Color[]
}

export interface ClothingItem {
  id: string
  name: string
  imageUrl: string
  colors: Color[]
  category: string
}

export interface TryOnResult {
  imageUrl: string
  confidence: number
}

export interface VirtualTryOnResult {
  originalImage: string
  tryOnImage: string
  confidence: number
} 