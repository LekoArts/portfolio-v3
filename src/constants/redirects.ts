interface Redirect {
	fromPath: string
	toPath: string
}

const _REDIRECTS: Array<Redirect> = [
	{
		fromPath: '/personal/',
		toPath: '/about/',
	},
	{
		fromPath: '/garden/testing-gatsby-s-head-api-with-vitest-and-playwright',
		toPath: '/testing-gatsbys-head-api-with-vitest-and-playwright/',
	},
	{
		fromPath: '/projects/',
		toPath: '/photos/',
	},
	{
		fromPath: '/blog/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/',
		toPath: '/writing/',
	},
	{
		fromPath: '/privacy/',
		toPath: '/privacy-policy/',
	},
	{
		fromPath: '/imprint/',
		toPath: '/legal-notice/',
	},
	{
		fromPath: '/contact/',
		toPath: '/about/',
	},
	{
		fromPath: '/tags/gatsby/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/gatsby-starter/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/gatsby-themes/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/compositing/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/photoshop/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/react/',
		toPath: '/writing/',
	},
	{
		fromPath: '/tags/figma/',
		toPath: '/writing/',
	},
	{
		fromPath: '/categories/tutorial/',
		toPath: '/writing/',
	},
	{
		fromPath: '/categories/freebie/',
		toPath: '/writing/',
	},
	{
		fromPath: '/categories/quicktipp/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/proprius-wallpaper-01/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/elitepvpers-wallpaper-2017/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-emma/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/10-tipps-fur-photoshop-anfanger/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-emilia/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/erstelle-dein-design-system-mit-gatsby/',
		toPath: '/specimens-for-gatsby-powered-design-systems/',
	},
	{
		fromPath: '/blog/quicktipp-netlify-discord-webhooks/',
		toPath: '/receiving-build-notifications-via-discord-webhooks/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-fuer-prismic-io/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/wie-gatsby-mit-steigenden-anforderungen-und-faehigkeiten-wachsen-kann/',
		toPath: '/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-cara/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-jodie/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/tipps-und-tricks-fuer-gatsby/',
		toPath: '/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/blog/wie-ich-mit-theme-ui-meine-gatsby-themes-bibliothek-gebaut-habe/',
		toPath: '/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
	},
	{
		fromPath: '/kontakt/',
		toPath: '/about/',
	},
	{
		fromPath: '/impressum/',
		toPath: '/legal-notice/',
	},
	{
		fromPath: '/datenschutz/',
		toPath: '/privacy-policy/',
	},
	{
		fromPath: '/projekte/',
		toPath: '/photos/',
	},
	{
		fromPath: '/en/',
		toPath: '/',
	},
	{
		fromPath: '/en/projects/',
		toPath: '/photos/',
	},
	{
		fromPath: '/en/blog/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/contact/',
		toPath: '/about/',
	},
	{
		fromPath: '/en/privacy/',
		toPath: '/privacy-policy/',
	},
	{
		fromPath: '/en/imprint/',
		toPath: '/legal-notice/',
	},
	{
		fromPath: '/en/tags/gatsby/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/tags/gatsby-starter/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/tags/gatsby-themes/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/tags/photoshop/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/tags/react/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/tags/type-script/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/categories/tutorial/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/categories/freebie/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/categories/quick-tip/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/proprius-wallpaper-01-en/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/elitepvpers-wallpaper-freebie-2017/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-emma/',
		toPath: '/writing/',
	},
	{
		fromPath: '/blog/10-tips-for-photoshop-beginners/',
		toPath: '/10-tips-for-photoshop-beginners/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-emilia/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/quick-tips-netlify-discord-webhooks/',
		toPath: '/receiving-build-notifications-via-discord-webhooks/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-for-prismic-io/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/how-gatsby-scales-with-your-expertise-and-scope/',
		toPath: '/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-cara/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-jodie/',
		toPath: '/writing/',
	},
	{
		fromPath: '/en/blog/tips-and-tricks-for-gatsby/',
		toPath: '/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/en/blog/how-i-used-theme-ui-to-build-my-gatsby-themes-library/',
		toPath: '/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
	},
	{
		fromPath: '/en/blog/setting-up-a-gatsby-themes-workspace-with-typescript-eslint-and-cypress/',
		toPath: '/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress/',
	},
	{
		fromPath: '/en/blog/specimens-for-gatsby-powered-design-systems/',
		toPath: '/specimens-for-gatsby-powered-design-systems/',
	},
	{
		fromPath: '/en/blog/language-tabs-for-gatsbys-code-blocks/',
		toPath: '/language-tabs-for-markdown-and-mdx-code-blocks/',
	},
	{
		fromPath: '/en/blog/adding-a-draft-feature-to-your-gatsby-site/',
		toPath: '/adding-a-draft-feature-to-gatsby/',
	},
	{
		fromPath: '/en/blog/creating-your-own-status-dashboard-with-gatsby/',
		toPath: '/creating-your-own-status-dashboard-with-gatsby/',
	},
	{
		fromPath: '/en/blog/adding-support-for-multiple-authors-in-gatsby/',
		toPath: '/adding-support-for-multiple-authors-in-gatsby/',
	},
	{
		fromPath: '/en/blog/filter-future-posts-in-gatsby/',
		toPath: '/filter-future-posts-on-a-gatsby-blog/',
	},
	{
		fromPath: '/en/blog/adding-line-numbers-and-code-highlighting-to-mdx-code-blocks/',
		toPath: '/adding-line-numbers-and-code-highlighting-to-mdx/',
	},
	{
		fromPath: '/en/blog/using-theme-ui-as-the-starting-point-for-your-figma-design-and-gatsby-development/',
		toPath: '/introducing-the-theme-ui-plugin-for-figma/',
	},
	{
		fromPath: '/gatsby/',
		toPath: '/writing/',
	},
	{
		fromPath: '/gatsby/how-gatsby-scales-with-your-expertise-and-scope/',
		toPath: '/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/gatsby/tips-and-tricks-for-gatsby/',
		toPath: '/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/gatsby/using-deferred-static-generation-with-analytics-tools/',
		toPath: '/using-deferred-static-generation-with-analytics-tools/',
	},
	{
		fromPath: '/projects/',
		toPath: '/resume/',
	},
	{
		fromPath: '/garden/gatsby-starter-for-prismic-io/',
		toPath: '/writing/',
	},
	{
		fromPath: '/art/',
		toPath: '/photos/',
	},
	{
		fromPath: '/art/design/',
		toPath: '/photos/',
	},
	{
		fromPath: '/art/3d/',
		toPath: '/photos/',
	},
	{
		fromPath: '/design/10-tips-for-photoshop-beginners/',
		toPath: '/10-tips-for-photoshop-beginners/',
	},
	{
		fromPath: '/react/how-gatsby-scales-with-your-expertise-and-scope/',
		toPath: '/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/react/tips-and-tricks-for-gatsby/',
		toPath: '/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/javascript/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
		toPath: '/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
	},
	{
		fromPath: '/javascript/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress/',
		toPath: '/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress/',
	},
	{
		fromPath: '/design/introducing-the-theme-ui-plugin-for-figma/',
		toPath: '/introducing-the-theme-ui-plugin-for-figma/',
	},
	{
		fromPath: '/react/how-to-build-an-advanced-multipart-component-with-chakra-ui/',
		toPath: '/building-an-advanced-multipart-component-with-chakra-ui/',
	},
	{
		fromPath: '/react/using-deferred-static-generation-with-analytics-tools/',
		toPath: '/using-deferred-static-generation-with-analytics-tools/',
	},
	{
		fromPath: '/javascript/creating-a-figma-plugin-with-svelte/',
		toPath: '/creating-a-figma-plugin-with-svelte/',
	},
	{
		fromPath: '/javascript/writing-performant-css-with-vanilla-extract/',
		toPath: '/writing-performant-css-with-vanilla-extract/',
	},
	{
		fromPath: '/garden/[slug]',
		toPath: '/[slug]',
	},
]

function formatRedirects(input: Array<Redirect>) {
	return Object.fromEntries(input.map(r => [r.fromPath, r.toPath]))
}

export const REDIRECTS = formatRedirects(_REDIRECTS)
