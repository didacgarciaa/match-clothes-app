import { Color } from '@/lib/types'
import { colors } from '@/lib/config/colors'

interface ColorAnalysisProps {
  dominantColors: Color[]
  suggestedColors: Color[]
}

export default function ColorAnalysis({ dominantColors, suggestedColors }: ColorAnalysisProps) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${colors.textClasses.primary}`}>
        Color Analysis
      </h2>

      <div className="space-y-4">
        <div>
          <h3 className={`text-lg font-medium mb-2 ${colors.textClasses.secondary}`}>
            Dominant Colors
          </h3>
          <div className="flex flex-wrap gap-2">
            {dominantColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: color.hex }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2"
                  style={{ backgroundColor: color.hex }}
                />
                <span className={`text-sm font-medium ${color.isLight ? colors.textClasses.primary : colors.textClasses.primary}`}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className={`text-lg font-medium mb-2 ${colors.textClasses.secondary}`}>
            Suggested Colors
          </h3>
          <div className="flex flex-wrap gap-2">
            {suggestedColors.map((color, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: color.hex }}
              >
                <div
                  className="w-8 h-8 rounded-full border-2"
                  style={{ backgroundColor: color.hex }}
                />
                <span className={`text-sm font-medium ${color.isLight ? colors.textClasses.primary : colors.textClasses.primary}`}>
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 