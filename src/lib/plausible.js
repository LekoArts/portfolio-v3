window.plausible = window.plausible || function (...args) {
	(window.plausible.q = window.plausible.q || []).push(args)
}

window.plausible.init = window.plausible.init || function (i) {
	window.plausible.o = i || {}
}

window.plausible.init()
