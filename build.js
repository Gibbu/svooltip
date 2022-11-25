import sass from 'sass';
import { writeFileSync } from 'fs';
import { join } from 'path';

const build = async () => {
	const result = sass.compile('./package/svooltip.scss', {
		style: 'compressed',
		sourceMap: true
	}).css;

	writeFileSync(join('package', 'svooltip.css'), result);
};

build();
