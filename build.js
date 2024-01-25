import * as sass from 'sass';
import fs from 'fs';

const result = sass.compile('./package/styles.scss', {
	style: 'compressed',
	sourceMap: true
}).css;

fs.writeFileSync('./package/styles.css', result);

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

const editedPkg = {
	...pkg,
	exports: {
		'.': {
			svelte: './index.js',
			types: './index.d.ts'
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

fs.writeFileSync('./package/package.json', JSON.stringify(editedPkg, null, 2));

console.log('Compiled SCSS. Updated package.json.');
