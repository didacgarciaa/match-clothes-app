import Image from 'next/image';
import { colors } from '@/lib/config/colors';
import { ProductService, Product } from '@/lib/services/productService';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

type FlowStep = 'upload' | 'selectColor' | 'selectCombination' | 'selectClothingType' | 'results';

interface ResultsSectionProps {
  showResults: boolean;
  step: FlowStep | string;
  clotheType?: string;
  colorHexCodes?: string[];
}

interface ExtendedProduct extends Product {
  imageWidth: number;
  imageHeight: number;
}

type CardSize = 'col-span-1 row-span-1' | 'col-span-1 row-span-2';

const mockProducts: ExtendedProduct[] = [
  {
    title: "Classic Blue Denim Jeans",
    price: "$49.99",
    source: "Fashion Store",
    link: "https://example.com/jeans1",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1500
  },
  {
    title: "Slim Fit Black Jeans",
    price: "$59.99",
    source: "Urban Outfitters",
    link: "https://example.com/jeans2",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Vintage Washed Denim",
    price: "$69.99",
    source: "Levi's",
    link: "https://example.com/jeans3",
    thumbnail: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "High-Waisted Skinny Jeans",
    price: "$45.99",
    source: "H&M",
    link: "https://example.com/jeans4",
    thumbnail: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1500
  },
  {
    title: "Relaxed Fit Denim",
    price: "$54.99",
    source: "Gap",
    link: "https://example.com/jeans5",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Distressed Blue Jeans",
    price: "$64.99",
    source: "American Eagle",
    link: "https://example.com/jeans6",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Cropped Denim Jeans",
    price: "$39.99",
    source: "Zara",
    link: "https://example.com/jeans7",
    thumbnail: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1500
  },
  {
    title: "Mom Fit Jeans",
    price: "$44.99",
    source: "Forever 21",
    link: "https://example.com/jeans8",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Straight Leg Jeans",
    price: "$52.99",
    source: "Uniqlo",
    link: "https://example.com/jeans9",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Wide Leg Jeans",
    price: "$47.99",
    source: "Mango",
    link: "https://example.com/jeans10",
    thumbnail: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1500
  },
  {
    title: "Bootcut Jeans",
    price: "$56.99",
    source: "Guess",
    link: "https://example.com/jeans11",
    thumbnail: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Flare Jeans",
    price: "$49.99",
    source: "Topshop",
    link: "https://example.com/jeans12",
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1000
  },
  {
    title: "Skinny Fit Jeans",
    price: "$54.99",
    source: "Hollister",
    link: "https://example.com/jeans13",
    thumbnail: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1500&q=80",
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    title: "Cargo Jeans",
    price: "$59.99",
    source: "Dickies",
    link: "https://example.com/jeans14",
    thumbnail: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1500&q=80",
    imageWidth: 1500,
    imageHeight: 1000
  },
  {
    title: "Ripped Jeans",
    price: "$49.99",
    source: "Pull&Bear",
    link: "https://example.com/jeans15",
    thumbnail: "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&w=1000&q=80",
    imageWidth: 1000,
    imageHeight: 1500
  }
];

const getCardSize = (item: ExtendedProduct, index: number, totalItems: number): CardSize => {
  const aspectRatio = item.imageHeight / item.imageWidth;
  const isLastRow = index >= totalItems - 3;
  
  if (aspectRatio < 1.2) {
    return 'col-span-1 row-span-1';
  }
  
  if ((index + 1) % 3 === 2) {
    return 'col-span-1 row-span-2';
  }
  
  if (isLastRow) {
    if (totalItems % 3 === 1) {
      return 'col-span-1 row-span-2';
    } else if (totalItems % 3 === 2) {
      return index === totalItems - 1 ? 'col-span-1 row-span-2' : 'col-span-1 row-span-1';
    }
  }
  
  if (aspectRatio >= 1.2) {
    return 'col-span-1 row-span-2';
  }
  
  return 'col-span-1 row-span-1';
};

interface ToggleProps {
  enabled: boolean;
  onChange: () => void;
  label: string;
}

const Toggle = ({ enabled, onChange, label }: ToggleProps) => (
  <div className="flex items-center gap-2">
    <span className="text-sm" style={{ color: colors.text }}>{label}</span>
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

interface ProductCardProps {
  product: ExtendedProduct;
  index: number;
  totalProducts: number;
  onTryOn: (productLink: string, imageUrl: string) => void;
}

const ProductCard = ({ product, index, totalProducts, onTryOn }: ProductCardProps) => (
  <div 
    className={`relative rounded-2xl overflow-hidden group cursor-pointer ${getCardSize(product, index, totalProducts)}`}
    style={{ backgroundColor: colors.background }}
  >
    {product.thumbnail ? (
      <div className="relative w-full h-full">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-300 group-hover:brightness-50"
        />
      </div>
    ) : (
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <span className="text-5xl" style={{ color: colors.primary }}>
          {product.title.charAt(0)}
        </span>
      </div>
    )}
    <div className="absolute inset-0 flex flex-col justify-end p-6">
      <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
        <a 
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
          onClick={(e) => {
            e.preventDefault();
            window.open(product.link, '_blank', 'noopener,noreferrer');
          }}
        >
          <h4 className="font-medium text-white mb-2 relative hover:underline">
            {product.title}
          </h4>
        </a>
        <p className="text-sm text-white mb-4">{product.price}</p>
        <button
          className="w-full py-2 px-4 rounded-2xl font-medium text-white transition-all duration-200 text-sm hover:opacity-80 hover:scale-[0.98]"
          style={{ backgroundColor: colors.primary }}
          onClick={() => onTryOn(product.link, product.thumbnail || '')}
        >
          Try On  
        </button>
      </div>
    </div>
  </div>
);

interface ProductGridProps {
  products: ExtendedProduct[];
  onTryOn: (productLink: string, imageUrl: string) => void;
}

const ProductGrid = ({ products, onTryOn }: ProductGridProps) => (
  <div 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 auto-rows-[200px] max-h-[800px] overflow-y-auto pr-2"
    style={{
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    }}
  >
    <style jsx>{`
      div::-webkit-scrollbar {
        display: none;
      }
    `}</style>
    {products.map((product, index) => (
      <ProductCard 
        key={index}
        product={product}
        index={index}
        totalProducts={products.length}
        onTryOn={onTryOn}
      />
    ))}
  </div>
);

export default function ResultsSection({ showResults, step, clotheType, colorHexCodes }: ResultsSectionProps) {
  const [products, setProducts] = useState<ExtendedProduct[]>(mockProducts);
  const [loading, setLoading] = useState(false);
  const [useFakeData, setUseFakeData] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const fetchProducts = async () => {
    if (!showResults || step !== 'results') return;
    
    setLoading(true);
    setError(null);
    
    try {
      if (useFakeData) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProducts(mockProducts);
      } else {
        if (!clotheType || !colorHexCodes || colorHexCodes.length === 0) {
          throw new Error('Clothing type and colors are required');
        }
        
        const productService = ProductService.getInstance();
        const results = await productService.getProductsByTypeAndColor(clotheType, colorHexCodes.join(','));
        setProducts(results as ExtendedProduct[]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch products');
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const handleTryOn = (productLink: string, imageUrl: string) => {
    router.push(`/pages/virtual-try-on?product=${encodeURIComponent(productLink)}&image=${encodeURIComponent(imageUrl)}`);
  };

  useEffect(() => {
    fetchProducts();
  }, [showResults, step, clotheType, colorHexCodes, useFakeData]);

  if (!showResults || step !== 'results') return null;

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="w-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold" style={{ color: colors.text }}>
              Recommended Items
            </h3>
            <Toggle 
              enabled={useFakeData} 
              onChange={() => setUseFakeData(!useFakeData)} 
              label="Use Fake Data" 
            />
          </div>
          
          {error && !useFakeData && (
            <div className="text-center mb-4 p-4 rounded-lg bg-red-50" style={{ color: colors.error }}>
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="text-center" style={{ color: colors.text }}>
              Loading products...
            </div>
          ) : (
            <ProductGrid products={products} onTryOn={handleTryOn} />
          )}
        </div>
      </div>
    </section>
  );
} 