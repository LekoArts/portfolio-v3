import fs from 'node:fs/promises'
import path from 'node:path'
import { confirm, group, intro, isCancel, multiselect, outro, select, text } from '@clack/prompts'
import slugify from '@sindresorhus/slugify'
import { ICON_CHOICES, TAGS_CHOICES, TYPE_CHOICES } from '../src/constants/content'
import { titleCase } from './titlecase'

type Icon = typeof ICON_CHOICES[number]
type Tag = typeof TAGS_CHOICES[number]
type Type = typeof TYPE_CHOICES[number]

const BODY_TEMPLATE = `Context: What are you talking about?
Relevance: Why should I care about that?
Application: How do I do it?

Learning goals => Assessment => Lesson Plan`

interface Frontmatter {
	title: string
	slug: string
	description: string
	date: string
	lastUpdated: string
	type: Type
	tags: Tag[]
	icon: Icon
}

async function main() {
	intro('Writing Wizard')

	const rawTitle = await text({
		message: 'Title',
		validate(value) {
			if (!value)
				return 'Title is required'
		},
	})

	if (isCancel(rawTitle)) {
		outro('Bye!')
		process.exit(0)
	}

	const rest = await group({
		slug: () => text({
			message: 'Slug',
			initialValue: slugify(rawTitle, { separator: '-' }),
			validate(value) {
				if (!value)
					return 'Slug is required'
			},
		}),
		description: () => text({
			message: 'Description',
			validate(value) {
				if (!value)
					return 'Description is required'
			},
		}),
		date: () => text({
			message: 'Date',
			initialValue: new Date().toISOString().split('T')[0],
			validate(value) {
				if (!value)
					return 'Date is required'

				if (!/^\d{4}-\d{2}-\d{2}$/.test(value))
					return 'Invalid date format'
			},
		}),
		type: () => select({
			message: 'Pick a type',
			options: TYPE_CHOICES.map(type => ({ value: type, label: type })),
		}),
		tags: () => multiselect({
			message: 'Pick tags',
			options: TAGS_CHOICES.map(tag => ({ value: tag, label: tag })),
			required: true,
		}),
		icon: () => select({
			message: 'Pick an icon',
			options: ICON_CHOICES.map(icon => ({ value: icon, label: icon })),
		}),
	})

	if (isCancel(rest)) {
		outro('Bye!')
		process.exit(0)
	}

	const fm: Frontmatter = {
		title: titleCase(rawTitle),
		lastUpdated: rest.date,
		...rest,
	}

	const filename = `${fm.date}--${fm.slug}.mdx`
	const filePath = path.join(process.cwd(), 'src', 'content', 'writing', filename)

	const content = `---
title: "${fm.title}"
slug: ${fm.slug}
description: "${fm.description}"
date: ${fm.date}
lastUpdated: ${fm.lastUpdated}
type: ${fm.type}
icon: ${fm.icon}
tags:
${fm.tags.map(tag => `  - ${tag}`).join('\n')}
---

${BODY_TEMPLATE}
`

	const shouldProceed = await confirm({
		message: 'Want to create the file?',
	})

	if (!shouldProceed) {
		outro('Bye!')
		process.exit(0)
	}

	await fs.writeFile(filePath, content)

	outro(`File created at ${filePath}`)
}

main().catch((error) => {
	console.error('Error:', error)
	process.exit(1)
})
