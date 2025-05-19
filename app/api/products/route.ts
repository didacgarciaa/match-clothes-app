import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');
  const colors = searchParams.get('colors')?.split(',') || [];

  if (!type || colors.length === 0) {
    return NextResponse.json(
      { error: 'Type and colors are required' },
      { status: 400 }
    );
  }

  const apiKey = process.env.SERPAPI_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: 'API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Convert hex colors to color names for better search results
    const colorNames = colors.map(color => getColorNameFromHex(color));
    
    // Combine the clothing type with all color names for the search query
    // This will find clothes that match with the selected color combination
    const query = `${type} ${colorNames.join(' ')}`;
    
    console.log('SerpAPI search query:', query);
    
    const searchUrl = `https://serpapi.com/search.json?engine=google_shopping&q=${encodeURIComponent(query)}&num=100&direct_link=true&api_key=${apiKey}`;
    console.log('SerpAPI URL:', searchUrl);
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch from SerpAPI: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    // Check if we have shopping_results in the response
    if (!data.shopping_results) {
      console.error('No shopping_results in SerpAPI response:', data);
      return NextResponse.json(
        { 
          error: 'No shopping results found in API response',
          searchQuery: query
        },
        { status: 404 }
      );
    }
    
    const products = data.shopping_results.map((item: any) => ({
      title: item.title,
      price: item.price,
      source: item.source,
      link: item.link || item.product_link,
      thumbnail: item.thumbnail,
      position: item.position,
      extracted_price: item.extracted_price
    }));

    return NextResponse.json({ products, total: products.length });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

function getColorNameFromHex(hex: string): string {
  const colorMap: { [key: string]: string } = {
    // Basic colors
    '#000000': 'black',
    '#FFFFFF': 'white',
    '#808080': 'gray',
    '#C0C0C0': 'silver',
    '#800000': 'maroon',
    '#FF0000': 'red',
    '#800080': 'purple',
    '#FF00FF': 'pink',
    '#008000': 'green',
    '#00FF00': 'lime',
    '#808000': 'olive',
    '#FFFF00': 'yellow',
    '#000080': 'navy',
    '#0000FF': 'blue',
    '#008080': 'teal',
    '#00FFFF': 'cyan',
    '#FFA500': 'orange',
    '#A52A2A': 'brown',
    '#F5F5DC': 'beige',
    '#FFE4C4': 'tan',
    '#D2B48C': 'khaki',
    '#FFEBCD': 'cream',
    '#87CEEB': 'sky blue',
    '#4682B4': 'steel blue',
    '#483D8B': 'indigo',
    '#6A5ACD': 'slate blue',
    '#2E8B57': 'sea green',
    '#228B22': 'forest green',
    '#556B2F': 'olive green',
    '#8B4513': 'chocolate',
    '#A0522D': 'sienna',
    '#CD853F': 'tan brown',
    '#DEB887': 'burlywood',
    '#BC8F8F': 'rosybrown',
    '#F08080': 'coral',
    '#FF6347': 'tomato',
    '#FF4500': 'orange red',
    '#FFD700': 'gold',
    '#FFDAB9': 'peach',
    '#EE82EE': 'violet',
    '#DA70D6': 'orchid',
    '#FF1493': 'hot pink',
    '#FFC0CB': 'light pink',
    '#FFB6C1': 'pastel pink',
    '#E6E6FA': 'lavender',
    '#F0F8FF': 'baby blue',
    '#F5FFFA': 'mint',
    '#F0FFF0': 'honeydew',
    '#FFF5EE': 'off white',
    '#DCDCDC': 'light gray',
    '#696969': 'charcoal',
    '#2F4F4F': 'dark slate gray'
  };

  // Normalize the hex code for comparison
  const normalizedHex = hex.toUpperCase();
  
  // Try to get the exact color name from the map
  if (colorMap[normalizedHex]) {
    return colorMap[normalizedHex];
  }

  // If we don't have an exact match, find the closest color in our map
  const r = parseInt(normalizedHex.slice(1, 3), 16);
  const g = parseInt(normalizedHex.slice(3, 5), 16);
  const b = parseInt(normalizedHex.slice(5, 7), 16);

  let closestColor = 'color';
  let minDistance = Number.MAX_VALUE;

  // Calculate color distance using Euclidean distance in RGB space
  for (const mapHex in colorMap) {
    const mapR = parseInt(mapHex.slice(1, 3), 16);
    const mapG = parseInt(mapHex.slice(3, 5), 16);
    const mapB = parseInt(mapHex.slice(5, 7), 16);
    
    // Calculate Euclidean distance
    const distance = Math.sqrt(
      Math.pow(r - mapR, 2) + 
      Math.pow(g - mapG, 2) + 
      Math.pow(b - mapB, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = colorMap[mapHex];
    }
  }
  
  return closestColor;
} 