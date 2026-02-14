import type { SandpackProviderProps } from '@codesandbox/sandpack-react'
import {
	SandpackCodeEditor,
	SandpackFileExplorer,
	SandpackLayout,
	SandpackProvider,
	useSandpack,
} from '@codesandbox/sandpack-react'
import * as React from 'react'
import { rootWrapper, spLayout, spWrapper } from './file-explorer.css'
import { customBarStyle, customTheme } from './sandpack.css'

const providerOptions: SandpackProviderProps['options'] = {
	classes: {
		'sp-layout': spLayout,
		'sp-wrapper': spWrapper,
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
			<header className={customBarStyle}>{title}</header>
			<SandpackLayout>
				<SandpackFileExplorer />
				<SandpackCodeEditor showTabs={false} readOnly showReadOnly={false} />
			</SandpackLayout>
		</div>
	)
}

export function FileExplorer({ files, title, entry }: IFileExplorerProps) {
	return (
		<SandpackProvider files={files} theme={customTheme} options={providerOptions} customSetup={{ entry }}>
			<FileExplorerContents title={title} />
		</SandpackProvider>
	)
}
