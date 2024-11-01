## Use Darkmode

copy this script to your html file

```html
<script is:inline>
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	function setDarkMode(document) {
		const isDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;
		const theme =
			localStorage.getItem("F-Theme") || (isDark ? "dark" : "light");

		if(theme === "system"){
			document.documentElement.classList[isDark ? "add" : "remove"]("dark");
			document.documentElement.style.colorScheme = isDark ? "dark" : "light";
			return;
		}

		document.documentElement.classList[theme === "dark" ? "add" : "remove"](
			"dark",
		);
		document.documentElement.style.colorScheme =
			theme === "dark" ? "dark" : "light";
	}

	setDarkMode(document);

	document.addEventListener("astro:before-swap", (event) =>
		setDarkMode(event.newDocument),
	);
	mediaQuery.addEventListener("change", (event) => setDarkMode(document));
</script>
```