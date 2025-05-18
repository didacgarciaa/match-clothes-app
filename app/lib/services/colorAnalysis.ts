import { Color, ColorAnalysis } from '@/lib/types'

interface ColorCount {
  count: number
  name: string
}

type ColorNameDefinition = [number, number, number, string]

export class ColorAnalysisService {
  private static instance: ColorAnalysisService
  private readonly colorNames: ColorNameDefinition[] = [
    [0, 0, 0, 'Black'],
    [255, 255, 255, 'White'],
    [255, 0, 0, 'Red'],
    [0, 255, 0, 'Green'],
    [0, 0, 255, 'Blue'],
    [255, 255, 0, 'Yellow'],
    [0, 255, 255, 'Cyan'],
    [255, 0, 255, 'Magenta'],
    [128, 0, 0, 'Maroon'],
    [0, 128, 0, 'Dark Green'],
    [0, 0, 128, 'Navy'],
    [128, 128, 0, 'Olive'],
    [128, 0, 128, 'Purple'],
    [0, 128, 128, 'Teal'],
    [165, 42, 42, 'Brown'],
    [128, 128, 128, 'Gray'],
    [192, 192, 192, 'Silver'],
    [255, 165, 0, 'Orange'],
    [255, 192, 203, 'Pink']
  ]

  private constructor() {}

  static getInstance(): ColorAnalysisService {
    if (!ColorAnalysisService.instance) {
      ColorAnalysisService.instance = new ColorAnalysisService()
    }
    return ColorAnalysisService.instance
  }

  async analyzeImage(imageData: string): Promise<ColorAnalysis> {
    try {
      const dominantColors = await this.extractDominantColors(imageData)
      
      return { dominantColors }
    } catch (error) {
      console.error('Error analyzing image:', error)
      throw new Error('Failed to analyze image colors')
    }
  }

  private async extractDominantColors(imageData: string): Promise<Color[]> {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        if (!context) {
          resolve([])
          return
        }
        
        canvas.width = img.width
        canvas.height = img.height
        context.drawImage(img, 0, 0, img.width, img.height)
        
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
        const pixels = imageData.data
        
        const colorMap: Record<string, ColorCount> = {}
        const skipFactor = 4
        
        this.processPixels(pixels, skipFactor, colorMap)
        
        const totalPixels = canvas.width * canvas.height / skipFactor
        const sortedColors = this.getSortedColors(colorMap, totalPixels)
        
        resolve(sortedColors)
      }
      
      img.src = imageData
    })
  }

  private processPixels(pixels: Uint8ClampedArray, skipFactor: number, colorMap: Record<string, ColorCount>): void {
    for (let i = 0; i < pixels.length; i += 4 * skipFactor) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const a = pixels[i + 3]
      
      if (a < 128) continue
      
      const hex = this.rgbToHex(r, g, b)
      const simplifiedHex = this.simplifyColor(hex)
      
      if (!colorMap[simplifiedHex]) {
        colorMap[simplifiedHex] = { 
          count: 1, 
          name: this.getColorName(r, g, b)
        }
      } else {
        colorMap[simplifiedHex].count++
      }
    }
  }

  private getSortedColors(colorMap: Record<string, ColorCount>, totalPixels: number): Color[] {
    return Object.entries(colorMap)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, 5)
      .map(([hex, data]) => {
        const percentage = Math.round((data.count / totalPixels) * 100)
        const isLight = this.isLightColor(hex)
        
        return {
          hex,
          name: data.name,
          percentage,
          isLight
        }
      })
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
  }
  
  private simplifyColor(hex: string): string {
    const r = Math.floor(parseInt(hex.slice(1, 3), 16) / 16) * 16
    const g = Math.floor(parseInt(hex.slice(3, 5), 16) / 16) * 16
    const b = Math.floor(parseInt(hex.slice(5, 7), 16) / 16) * 16
    
    return this.rgbToHex(r, g, b)
  }
  
  private getColorName(r: number, g: number, b: number): string {
    let minDistance = Infinity
    let closestColor = 'Unknown'
    
    for (const [cr, cg, cb, name] of this.colorNames) {
      const distance = Math.sqrt(Math.pow(r - cr, 2) + Math.pow(g - cg, 2) + Math.pow(b - cb, 2))
      if (distance < minDistance) {
        minDistance = distance
        closestColor = name
      }
    }
    
    return closestColor
  }
  
  private isLightColor(hex: string): boolean {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness >= 128
  }
} 