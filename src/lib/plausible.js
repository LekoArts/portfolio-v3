window.plausible = window.plausible || ((...args) => {
	(window.plausible.q = window.plausible.q || []).push(args)
})

window.plausible.init = window.plausible.init || ((i) => {
	window.plausible.o = i || {}
})

window.plausible.init()
