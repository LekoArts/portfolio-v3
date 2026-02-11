import type { SandpackProviderProps } from '@codesandbox/sandpack-react'
import {
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackProvider,
	useSandpack,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import * as React from 'react'
import { header, rootWrapper, spLayout, spPrePlaceholder } from './file-explorer.css'

const providerOptions: SandpackProviderProps['options'] = {
	classes: {
		'sp-pre-placeholder': spPrePlaceholder,
		'sp-layout': spLayout,
	},
}

interface IFileExplorerProps {
	files: Record<string, string>
	title: string
	entry: string
}

function FileExplorerContents({ title }: { title: string }) {
	const { sandpack } = useSandpack()

	React.useEffect(() => {
		// Delete the default package.json file that Sandpack creates
		sandpack.deleteFile('/package.json')
	}, [])

	return (
		<div className={rootWrapper}>
			<header className={header}>{title}</header>
			<SandpackLayout>
				<SandpackFileExplorer />
				<SandpackCodeEditor showTabs={false} readOnly showReadOnly={false} />
			</SandpackLayout>
		</div>
	)
}

export function FileExplorer({ files, title, entry }: IFileExplorerProps) {
	return (
		<SandpackProvider files={files} theme={nightOwl} options={providerOptions} customSetup={{ entry }}>
			<FileExplorerContents title={title} />
		</SandpackProvider>
	)
}
