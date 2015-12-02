__karma__.loaded = function () {};

System.config({
	packages: {
		'static/js': {
			defaultExtension: 'js',
			format: 'register', //maybe wrong
			map: Object.keys(window.__karma__.files)
					.filter(onlyAppFiles)
					.reduce(mapAppFiles, {})
		}
	}
})

Promise.all(
	Object
		.keys(window.__karma__.files)
		.filter(onlyTestFiles)
		.map(function (moduleName) {
			return System.import(moduleName);
		})
).then(
	function () { __karma__.start(); },
	function (err) { __karma__.error(err.stack || err) }
)


function onlyAppFiles (filePath) {
	return filePath.indexOf('.tests.') === -1;
}

function onlyTestFiles (filePath) {
	return filePath.indexOf('.tests.') > -1;
}

function mapAppFiles (pathsMapping, appPath) {
	var moduleName = appPath.replace(/^static\/js\//, './');
	pathsMapping[moduleName] = appPath + '?' + window.__karma__.files[appPath];
	return pathsMapping;
}