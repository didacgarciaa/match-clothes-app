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
    const products = data.shopping_results?.map((item: any) => ({
      title: item.title,
      price: item.price,
      source: item.source,
      link: item.link,
      thumbnail: item.thumbnail,
    })) || [];

    return NextResponse.json({ products });
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
    '#FF0000': 'red',
    '#00FF00': 'green',
    '#0000FF': 'blue',
    '#FFFF00': 'yellow',
    '#FF00FF': 'magenta',
    '#00FFFF': 'cyan',
    '#000000': 'black',
    '#FFFFFF': 'white',
    '#808080': 'gray',
    '#800000': 'maroon',
    '#808000': 'olive',
    '#008000': 'green',
    '#800080': 'purple',
    '#008080': 'teal',
    '#000080': 'navy',
    '#FFA500': 'orange',
    '#A52A2A': 'brown',
    '#FFC0CB': 'pink',
    '#D3D3D3': 'light gray',
    '#FFD700': 'gold',
    '#C0C0C0': 'silver',
    '#4B0082': 'indigo',
    '#FF1493': 'deep pink',
    '#00CED1': 'dark turquoise',
    '#FF4500': 'orange red',
    '#32CD32': 'lime green',
    '#BA55D3': 'medium orchid',
    '#FF69B4': 'hot pink',
    '#20B2AA': 'light sea green',
    '#FF6347': 'tomato',
    '#7B68EE': 'medium slate blue',
    '#00FA9A': 'medium spring green',
    '#DAA520': 'goldenrod',
    '#B8860B': 'dark goldenrod',
    '#CD853F': 'peru',
    '#D2691E': 'chocolate',
    '#8B4513': 'saddle brown',
    '#A0522D': 'sienna',
    '#6B8E23': 'olive drab',
    '#556B2F': 'dark olive green',
    '#228B22': 'forest green',
    '#006400': 'dark green',
    '#7CFC00': 'lawn green',
    '#7FFF00': 'chartreuse',
    '#90EE90': 'light green',
    '#98FB98': 'pale green',
    '#8FBC8F': 'dark sea green',
    '#3CB371': 'medium sea green',
    '#2E8B57': 'sea green',
    '#008B8B': 'dark cyan',
    '#48D1CC': 'medium turquoise',
    '#40E0D0': 'turquoise',
    '#7FFFD4': 'aquamarine',
    '#66CDAA': 'medium aquamarine',
    '#E0FFFF': 'light cyan',
    '#AFEEEE': 'pale turquoise',
    '#5F9EA0': 'cadet blue',
    '#4682B4': 'steel blue',
    '#B0C4DE': 'light steel blue',
    '#B0E0E6': 'powder blue',
    '#ADD8E6': 'light blue',
    '#87CEEB': 'sky blue',
    '#87CEFA': 'light sky blue',
    '#00BFFF': 'deep sky blue',
    '#1E90FF': 'dodger blue',
    '#6495ED': 'cornflower blue',
    '#4169E1': 'royal blue',
    '#0000CD': 'medium blue',
    '#00008B': 'dark blue',
    '#191970': 'midnight blue',
    '#E6E6FA': 'lavender',
    '#D8BFD8': 'thistle',
    '#DDA0DD': 'plum',
    '#EE82EE': 'violet',
    '#DA70D6': 'orchid',
    '#9932CC': 'dark orchid',
    '#9400D3': 'dark violet',
    '#8A2BE2': 'blue violet',
    '#A020F0': 'purple',
    '#9370DB': 'medium purple',
    '#8B008B': 'dark magenta',
    '#483D8B': 'dark slate blue',
    '#6A5ACD': 'slate blue',
    '#8470FF': 'light slate blue',
    '#F8F8FF': 'ghost white',
    '#FFF0F5': 'lavender blush',
    '#FFE4E1': 'misty rose',
    '#FFE4C4': 'bisque',
    '#FFDEAD': 'navajo white',
    '#FAEBD7': 'antique white',
    '#FAF0E6': 'linen',
    '#FFF5EE': 'seashell',
    '#F5F5F5': 'white smoke',
    '#F0F8FF': 'alice blue',
    '#F0FFFF': 'azure',
    '#F0FFF0': 'honeydew'
  };

  // Normalize the hex code for comparison
  const normalizedHex = hex.toUpperCase();
  
  // Try to get the exact color name from the map
  if (colorMap[normalizedHex]) {
    return colorMap[normalizedHex];
  }

  // If we don't have an exact match, approximate the color
  const r = parseInt(normalizedHex.slice(1, 3), 16);
  const g = parseInt(normalizedHex.slice(3, 5), 16);
  const b = parseInt(normalizedHex.slice(5, 7), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  if (brightness < 50) {
    return 'dark';
  } else if (brightness > 200) {
    return 'light';
  }

  const hue = Math.atan2(Math.sqrt(3) * (g - b), 2 * r - g - b) * 180 / Math.PI;
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  const value = Math.max(r, g, b);

  if (saturation < 30) {
    return brightness > 200 ? 'white' : 'gray';
  }

  if (value < 30) {
    return 'black';
  }

  // Determine color name based on hue
  const hueNormalized = (hue + 360) % 360; // Convert to 0-360 range
  
  if (hueNormalized >= 330 || hueNormalized < 30) {
    return 'red';
  } else if (hueNormalized >= 30 && hueNormalized < 90) {
    return 'yellow';
  } else if (hueNormalized >= 90 && hueNormalized < 150) {
    return 'green';
  } else if (hueNormalized >= 150 && hueNormalized < 210) {
    return 'cyan';
  } else if (hueNormalized >= 210 && hueNormalized < 270) {
    return 'blue';
  } else if (hueNormalized >= 270 && hueNormalized < 330) {
    return 'magenta';
  }
  
  return 'color';
} 