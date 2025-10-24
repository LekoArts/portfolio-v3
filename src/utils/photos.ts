interface ImageMetadata {
	title: string
	album: string
	order: number
}

/**
 * Extract metadata from image path
 *
 * @example
 * getImageMetadata('../content/photos/001___3D/mountain.jpg')
 * // Returns: { title: 'mountain', album: '3D', order: 001 }
 */
export function getImageMetadata(imagePath: string): ImageMetadata {
	const relevantPath = imagePath.replace('../content/photos/', '').replace(/\.(jpg|jpeg|png)$/i, '')
	const [folder, title] = relevantPath.split('/')
	const [order, album] = folder.split('___')

	return {
		title,
		album,
		order: Number.parseInt(order, 10),
	}
}
