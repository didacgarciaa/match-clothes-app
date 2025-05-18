import Image from 'next/image'
import { ClothingItem } from '@/lib/types'
import { colors } from '@/lib/config/colors'

interface ClothingSuggestionsProps {
  suggestions: ClothingItem[]
  onSelectItem: (item: ClothingItem) => void
}

export default function ClothingSuggestions({ suggestions, onSelectItem }: ClothingSuggestionsProps) {
  return (
    <div className="space-y-6">
      <h2 className={`text-2xl font-semibold ${colors.textClasses.primary}`}>
        Suggested Items
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suggestions.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelectItem(item)}
            className={`group relative aspect-square rounded-lg overflow-hidden transition-transform hover:scale-105
              ${colors.backgroundClasses.tertiary}`}
          >
            <div className="relative w-full h-full">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent
              flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity`}>
              <div className="text-left">
                <h3 className={`text-lg font-medium ${colors.textClasses.primary}`}>
                  {item.name}
                </h3>
                <p className={`text-sm ${colors.textClasses.secondary}`}>
                  {item.category}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
} 