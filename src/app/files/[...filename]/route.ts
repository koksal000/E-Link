
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  const pathSegments = params.filename; // e.g., ['catbox', 'abcdef.jpg'] or ['someother.png']

  // Check if the request is for a file hosted on catbox.moe via our specific path
  if (pathSegments.length === 2 && pathSegments[0] === 'catbox') {
    const catboxFileIdWithExt = pathSegments[1];
    if (catboxFileIdWithExt && /^[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/.test(catboxFileIdWithExt)) { // Basic validation for the ID format
      const catboxUrl = `https://files.catbox.moe/${catboxFileIdWithExt}`;
      return NextResponse.redirect(catboxUrl, 307); // 307 Temporary Redirect
    } else {
      // Invalid catbox ID format
      return new NextResponse(`Error: Invalid file identifier for 'catbox' route.`, {
        status: 400, // Bad Request
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  }

  // Fallback for non-catbox routes or if the above conditions aren't met: serve a placeholder image
  const filenameString = params.filename.join('/');
  const simpleFilename = params.filename[params.filename.length - 1];
  
  // Use a generic placeholder if it's not a recognized 'catbox' file
  // This ensures that any other paths under /files/ still show something
  const placeholderImageUrl = `https://placehold.co/600x400.png?text=${encodeURIComponent(simpleFilename || 'file')}`;
  
  try {
    const imageResponse = await fetch(placeholderImageUrl);
    if (!imageResponse.ok || !imageResponse.body) {
      throw new Error('Failed to fetch placeholder image');
    }
    const contentType = imageResponse.headers.get('content-type') || 'image/png';
    
    return new NextResponse(imageResponse.body, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Advise the browser to display the file inline if possible
        'Content-Disposition': `inline; filename="${simpleFilename || 'file'}"`, 
      },
    });

  } catch (error) {
    console.error(`Error serving placeholder for ${filenameString}:`, error);
    return new NextResponse(`Error: Could not serve placeholder for ${filenameString}.`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    });
  }
}
