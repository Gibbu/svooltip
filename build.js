import sass from 'sass';
import { writeFileSync } from 'fs';
import { join } from 'path';

const build = async () => {
	const result = sass.compile(join('package', 'styles.scss'), {
		style: 'compressed',
		sourceMap: true
	}).css;

	writeFileSync(join('package', 'styles.css'), result);
	console.log('[build:package] Successfully built to ./package');
};

build();
