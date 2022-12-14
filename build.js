import sass from 'sass';
import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

const build = async () => {
	const result = sass.compile(join('package', 'styles.scss'), {
		style: 'compressed',
		sourceMap: true
	}).css;

	writeFileSync(join('package', 'styles.css'), result);

	const data = readFileSync(join('package', 'package.json')).toString().split('\n');
	const getLine = data.findIndex((el) => el.includes('./styles.scss'));

	let pkg = data.splice(getLine, 0, `"./styles.css": "./styles.css",`);
	pkg = data.join('\n');

	writeFileSync(join('package', 'package.json'), pkg);

	console.log('[build:package] Successfully built to ./package');
};

build();
