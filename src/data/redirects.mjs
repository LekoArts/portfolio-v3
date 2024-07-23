const _REDIRECTS = [
	{
		fromPath: '/admin/',
		toPath: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	},
	{
		fromPath: '/www/',
		toPath: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
	},
	{
		fromPath: '/personal/',
		toPath: '/about/',
	},
	{
		fromPath: '/garden/testing-gatsby-s-head-api-with-vitest-and-playwright',
		toPath: '/garden/testing-gatsbys-head-api-with-vitest-and-playwright/',
	},
	{
		fromPath: '/projects/',
		toPath: '/art/',
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
		toPath: '/react/',
	},
	{
		fromPath: '/tags/gatsby-starter/',
		toPath: '/react/',
	},
	{
		fromPath: '/tags/gatsby-themes/',
		toPath: '/react/',
	},
	{
		fromPath: '/tags/compositing/',
		toPath: '/design/',
	},
	{
		fromPath: '/tags/photoshop/',
		toPath: '/design/',
	},
	{
		fromPath: '/tags/react/',
		toPath: '/react/',
	},
	{
		fromPath: '/tags/figma/',
		toPath: '/design/',
	},
	{
		fromPath: '/categories/tutorial/',
		toPath: '/tutorials/',
	},
	{
		fromPath: '/categories/freebie/',
		toPath: '/garden/',
	},
	{
		fromPath: '/categories/quicktipp/',
		toPath: '/garden/',
	},
	{
		fromPath: '/blog/proprius-wallpaper-01/',
		toPath: '/garden/proprius-wallpaper/',
	},
	{
		fromPath: '/blog/elitepvpers-wallpaper-2017/',
		toPath: '/garden/elitepvpers-wallpaper-2017/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-emma/',
		toPath: '/garden/gatsby-starter-portfolio-emma/',
	},
	{
		fromPath: '/blog/10-tipps-fur-photoshop-anfanger/',
		toPath: '/design/10-tips-for-photoshop-beginners/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-emilia/',
		toPath: '/garden/gatsby-starter-portfolio-emilia/',
	},
	{
		fromPath: '/blog/erstelle-dein-design-system-mit-gatsby/',
		toPath: '/garden/specimens-for-gatsby-powered-design-systems/',
	},
	{
		fromPath: '/blog/quicktipp-netlify-discord-webhooks/',
		toPath: '/garden/receiving-build-notifications-via-discord-webhooks/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-fuer-prismic-io/',
		toPath: '/garden/gatsby-starter-for-prismic-io/',
	},
	{
		fromPath: '/blog/wie-gatsby-mit-steigenden-anforderungen-und-faehigkeiten-wachsen-kann/',
		toPath: '/react/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-cara/',
		toPath: '/garden/gatsby-starter-portfolio-cara/',
	},
	{
		fromPath: '/blog/gatsby-starter-portfolio-jodie/',
		toPath: '/garden/gatsby-starter-portfolio-jodie/',
	},
	{
		fromPath: '/blog/tipps-und-tricks-fuer-gatsby/',
		toPath: '/react/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/blog/wie-ich-mit-theme-ui-meine-gatsby-themes-bibliothek-gebaut-habe/',
		toPath: '/javascript/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
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
		toPath: '/art/',
	},
	{
		fromPath: '/en/',
		toPath: '/',
	},
	{
		fromPath: '/en/projects/',
		toPath: '/art/',
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
		toPath: '/react/',
	},
	{
		fromPath: '/en/tags/gatsby-starter/',
		toPath: '/react/',
	},
	{
		fromPath: '/en/tags/gatsby-themes/',
		toPath: '/react/',
	},
	{
		fromPath: '/en/tags/photoshop/',
		toPath: '/design/',
	},
	{
		fromPath: '/en/tags/react/',
		toPath: '/react/',
	},
	{
		fromPath: '/en/tags/type-script/',
		toPath: '/javascript/',
	},
	{
		fromPath: '/en/categories/tutorial/',
		toPath: '/tutorials/',
	},
	{
		fromPath: '/en/categories/freebie/',
		toPath: '/garden/',
	},
	{
		fromPath: '/en/categories/quick-tip/',
		toPath: '/garden/',
	},
	{
		fromPath: '/en/blog/proprius-wallpaper-01-en/',
		toPath: '/garden/proprius-wallpaper/',
	},
	{
		fromPath: '/en/blog/elitepvpers-wallpaper-freebie-2017/',
		toPath: '/garden/elitepvpers-wallpaper-2017/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-emma/',
		toPath: '/garden/gatsby-starter-portfolio-emma/',
	},
	{
		fromPath: '/blog/10-tips-for-photoshop-beginners/',
		toPath: '/design/10-tips-for-photoshop-beginners/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-emilia/',
		toPath: '/garden/gatsby-starter-portfolio-emilia/',
	},
	{
		fromPath: '/en/blog/quick-tips-netlify-discord-webhooks/',
		toPath: '/garden/receiving-build-notifications-via-discord-webhooks/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-for-prismic-io/',
		toPath: '/garden/gatsby-starter-for-prismic-io/',
	},
	{
		fromPath: '/en/blog/how-gatsby-scales-with-your-expertise-and-scope/',
		toPath: '/react/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-cara/',
		toPath: '/garden/gatsby-starter-portfolio-cara/',
	},
	{
		fromPath: '/en/blog/gatsby-starter-portfolio-jodie/',
		toPath: '/garden/gatsby-starter-portfolio-jodie/',
	},
	{
		fromPath: '/en/blog/tips-and-tricks-for-gatsby/',
		toPath: '/react/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/en/blog/how-i-used-theme-ui-to-build-my-gatsby-themes-library/',
		toPath: '/javascript/how-i-used-theme-ui-to-seamlessly-convert-design-to-code/',
	},
	{
		fromPath: '/en/blog/setting-up-a-gatsby-themes-workspace-with-typescript-eslint-and-cypress/',
		toPath: '/javascript/setting-up-a-yarn-workspace-with-typescript-eslint-and-cypress/',
	},
	{
		fromPath: '/en/blog/specimens-for-gatsby-powered-design-systems/',
		toPath: '/garden/specimens-for-gatsby-powered-design-systems/',
	},
	{
		fromPath: '/en/blog/language-tabs-for-gatsbys-code-blocks/',
		toPath: '/garden/language-tabs-for-markdown-and-mdx-code-blocks/',
	},
	{
		fromPath: '/en/blog/adding-a-draft-feature-to-your-gatsby-site/',
		toPath: '/garden/adding-a-draft-feature-to-gatsby/',
	},
	{
		fromPath: '/en/blog/creating-your-own-status-dashboard-with-gatsby/',
		toPath: '/garden/creating-your-own-status-dashboard-with-gatsby/',
	},
	{
		fromPath: '/en/blog/adding-support-for-multiple-authors-in-gatsby/',
		toPath: '/garden/adding-support-for-multiple-authors-in-gatsby/',
	},
	{
		fromPath: '/en/blog/filter-future-posts-in-gatsby/',
		toPath: '/garden/filter-future-posts-on-a-gatsby-blog/',
	},
	{
		fromPath: '/en/blog/adding-line-numbers-and-code-highlighting-to-mdx-code-blocks/',
		toPath: '/garden/adding-line-numbers-and-code-highlighting-to-mdx/',
	},
	{
		fromPath: '/en/blog/using-theme-ui-as-the-starting-point-for-your-figma-design-and-gatsby-development/',
		toPath: '/design/introducing-the-theme-ui-plugin-for-figma/',
	},
	{
		fromPath: '/gatsby/',
		toPath: '/react/',
	},
	{
		fromPath: '/gatsby/how-gatsby-scales-with-your-expertise-and-scope/',
		toPath: '/react/how-gatsby-scales-with-your-expertise-and-scope/',
	},
	{
		fromPath: '/gatsby/tips-and-tricks-for-gatsby/',
		toPath: '/react/tips-and-tricks-for-gatsby/',
	},
	{
		fromPath: '/gatsby/using-deferred-static-generation-with-analytics-tools/',
		toPath: '/react/using-deferred-static-generation-with-analytics-tools/',
	},
	{
		fromPath: '/projects/',
		toPath: '/resume/',
	},
	{
		fromPath: '/garden/gatsby-starter-for-prismic-io/',
		toPath: '/garden/',
	},
]

function formatRedirects(input) {
	return Object.fromEntries(input.map(r => [r.fromPath, r.toPath]))
}

export const REDIRECTS = formatRedirects(_REDIRECTS)
