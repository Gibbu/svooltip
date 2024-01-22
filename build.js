import * as sass from 'sass';
import fs from 'fs';
import { join } from 'path';

const result = sass.compile(join('package', 'styles.scss'), {
	style: 'compressed',
	sourceMap: true
}).css;

fs.writeFileSync(join('package', 'styles.css'), result);

console.log('[build:package] Compiled SCSS file.');
console.log('[build:package] Generating package.json.');

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const editedPkg = {
	...pkg,
	exports: {
		'.': {
			svelte: './index.js'
		},
		'./package.json': './package.json',
		'./defaults': './defaults.js',
		'./styles.css': './styles.css',
		'./styles.scss': './styles.scss',
		'./Tooltip.svelte': './Tooltip.svelte',
		'./tooltip': './tooltip.js',
		'./types': './types.js',
		'./utils': './utils.js'
	}
};

fs.writeFileSync(join('package', 'package.json'), JSON.stringify(editedPkg, null, 2));

console.log('[build:package] Successfully built to ./package');
