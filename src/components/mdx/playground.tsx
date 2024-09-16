import * as React from 'react'
import {
	SandpackCodeEditor,
	SandpackPreview,
	SandpackProvider,
	SandpackThemeProvider,
	UnstyledOpenInCodeSandboxButton,
	useSandpack,
	useSandpackNavigation,
} from '@codesandbox/sandpack-react'
import type {
	SandpackPredefinedTemplate,
	SandpackProviderProps,
	SandpackSetup,
} from '@codesandbox/sandpack-react'
import { nightOwl } from '@codesandbox/sandpack-themes'
import type { SVGIconNames } from '@constants/types'
import { visuallyHiddenStyle } from '@components/a11y/visually-hidden.css'
import {
	backwardButton,
	exportButton,
	header,
	headerButtonWrapper,
	middleWrapper,
	middleWrapperButtonWrapper,
	previewWrapper,
	refreshButton,
	rootWrapper,
	spCodeEditor,
	spPreviewContainer,
	spTabButton,
	whiteText,
} from './playground.css'

interface IPlaygroundProps {
	files: Record<string, string>
	template?: SandpackPredefinedTemplate
	title: string
	customSetup?: SandpackSetup
}

const providerOptions: SandpackProviderProps['options'] = {
	classes: {
		'sp-code-editor': spCodeEditor,
		'sp-tab-button': spTabButton,
		'sp-preview-container': spPreviewContainer,
	},
}

function SvgIcon({ id, ...props }: { id: SVGIconNames, [x: string]: any }) {
	return (
		<svg aria-hidden focusable="false" className="svg-icon" {...props}>
			<use href={`/icons.svg#${id}`} />
		</svg>
	)
}

const VisuallyHidden: React.FC<React.PropsWithChildren> = ({ children, ...rest }) => {
	return (
		<span className={visuallyHiddenStyle} {...rest}>
			{children}
		</span>
	)
}

const IconButton: React.FC<React.PropsWithChildren<{
	description: string
	className: string
	[x: string]: any
}>> = ({ className, description, children, ...rest }) => {
	return (
		<button className={className} {...rest}>
			{children}
			<VisuallyHidden>{description}</VisuallyHidden>
		</button>
	)
}

function PlaygroundContents({ title }: Pick<IPlaygroundProps, 'title'>) {
	const [refreshRotation, setRefreshRotation] = React.useState(0)
	const { refresh } = useSandpackNavigation()
	const { sandpack } = useSandpack()

	return (
		<div className={rootWrapper}>
			<header className={header}>
				<div>{title}</div>
				<div className={headerButtonWrapper}>
					<IconButton
						onClick={() => sandpack.resetAllFiles()}
						title="Reset code"
						description="Reset all code to its initial state"
						className={backwardButton}
					>
						<SvgIcon height="1.25rem" width="1.25rem" id="backward" />
					</IconButton>
					<UnstyledOpenInCodeSandboxButton className={exportButton}>
						<SvgIcon height="1.25rem" width="1.25rem" id="export" />
					</UnstyledOpenInCodeSandboxButton>
				</div>
			</header>
			<SandpackCodeEditor
				showLineNumbers={false}
				showTabs
				closableTabs={false}
			/>
			<div className={middleWrapper}>
				<div className={whiteText}>Result</div>
				<div className={middleWrapperButtonWrapper}>
					<IconButton
						onClick={() => {
							refresh()
							setRefreshRotation(refreshRotation + 360)
						}}
						title="Refresh pane"
						description="Refresh results pane"
						className={refreshButton}
						style={{ transform: `rotate(${refreshRotation}deg)` }}
					>
						<SvgIcon id="refresh" height="1.25rem" width="1.25rem" />
					</IconButton>
				</div>
			</div>
			<div className={previewWrapper}>
				<SandpackPreview
					showNavigator={false}
					showOpenInCodeSandbox={false}
					showRefreshButton={false}
				/>
			</div>
		</div>
	)
}

export function Playground({
	files,
	template = 'react',
	title,
	customSetup,
}: IPlaygroundProps) {
	return (
		<SandpackProvider
			template={template}
			files={files}
			options={providerOptions}
			customSetup={customSetup}
		>
			<SandpackThemeProvider theme={nightOwl}>
				<PlaygroundContents title={title} />
			</SandpackThemeProvider>
		</SandpackProvider>
	)
}
