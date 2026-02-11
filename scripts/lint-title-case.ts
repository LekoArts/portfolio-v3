import fs from 'node:fs/promises'
import path from 'node:path'
import { titleCase } from './titlecase'
import { parse } from './ultramatter'

interface Frontmatter {
	title: string
}

interface TitleCaseViolation {
	currentTitle: string
	expectedTitle: string
	relativePath: string
}

/**
 * Load the ignore list from ignore-title-case.txt file
 */
async function loadIgnoreList() {
	const ignoreList = new Set<string>()
	const ignoreFilePath = path.join(import.meta.dirname, 'ignore-title-case.txt')

	try {
		// use built-in fs module to read the file
		const data = await fs.readFile(ignoreFilePath, 'utf-8')
		data.split('\n').forEach((line) => {
			const trimmed = line.trim()
			if (trimmed) {
				ignoreList.add(trimmed)
			}
		})
	}
	catch (error) {
		// If the file doesn't exist or can't be read, just return an empty set
		console.warn(`Could not load ignore list from ${ignoreFilePath}:`, error)
	}

	return ignoreList
}

const writingDir = path.join(process.cwd(), 'src', 'content', 'writing')

/**
 * Check if a file's title is in correct title case, and return any violations
 */
async function checkFileTitle(filePath: string) {
	const fileContent = await fs.readFile(filePath, 'utf-8')
	const { frontmatter = {} } = parse(fileContent)
	const title = frontmatter.title as Frontmatter['title']
	const expectedTitle = titleCase(title)

	if (title !== expectedTitle) {
		return {
			currentTitle: title,
			expectedTitle,
			relativePath: path.relative(writingDir, filePath),
		}
	}

	return null
}

async function main() {
	const currentDir = process.cwd()
	const ignoreList = await loadIgnoreList()

	const files = await Array.fromAsync(fs.glob('src/content/**/*.mdx', { cwd: currentDir }))

	const violations: TitleCaseViolation[] = []

	for (const file of files) {
		const violation = await checkFileTitle(path.join(currentDir, file))
		if (violation && !ignoreList.has(violation.relativePath)) {
			violations.push(violation)
		}
	}

	if (violations.length > 0) {
		console.error('Title case violations found:')
		violations.forEach(({ currentTitle, expectedTitle, relativePath }) => {
			console.error(`- ${relativePath}: "${currentTitle}" should be "${expectedTitle}"`)
		})
		process.exit(1)
	}
	else {
		console.log('All titles are in correct title case!')
	}
}

main().catch((error) => {
	console.error('Error checking title case:', error)
	process.exit(1)
})
