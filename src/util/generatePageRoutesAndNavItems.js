let lastApp = null;
let lastReturn = null;

function parsePage(page, navItems, appPath, pageComponents) {
	let subpages = null;

	if (page.pages) {
		subpages = page.pages.map(subpage =>
			parsePage(subpage, navItems, appPath, pageComponents)
		);
	}

	return {
		appPath,
		page,
		subpages,
		component: typeof page.component === 'string' ? pageComponents[page.component] : page.component,
	};
}

export default function(app, pageComponents) {
	if (app.path === lastApp) {
		return lastReturn;
	}

	const pageRoutes = app.pages.map(page =>
		parsePage(page, navItems, app.path, pageComponents)
	);

	lastApp = app.path;
	lastReturn = { pageRoutes };

	return lastReturn;
}
