import type { FlickrImageUrls } from "@constants/types"

/**
 * Generates a srcSet string for responsive images based on the provided imageUrls object.
 * @param imageUrls - The imageUrls object from the Flickr API response
 * @returns A string representing the srcSet attribute for an image element
 */
export const getSrcSet = (imageUrls: FlickrImageUrls) => {
	const srcSetEntries: Array<string> = []
	const { '640px': sm, '800px': md, '1024px': lg, "1600px": xl } = imageUrls

	if (xl?.url && xl.width) {
    srcSetEntries.push(`${xl.url} ${xl.width}w`)
  }

  if (lg?.url && lg.width) {
    srcSetEntries.push(`${lg.url} ${lg.width}w`)
  }
  
  if (md?.url && md.width) {
    srcSetEntries.push(`${md.url} ${md.width}w`)
  }
  
  if (sm?.url && sm.width) {
    srcSetEntries.push(`${sm.url} ${sm.width}w`)
  }

  return srcSetEntries.join(', ')
}