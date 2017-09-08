import _ from 'lodash';

const cleanUp = line => line.replace(/"/g, '').trim();

const isNotEmpty = l => l.length;

var getTuple = (block) => {
	if (!block.length) return;
	const index = block.indexOf(' ');

	return {
		id: block.substring(0, index).trim(),
		name: block.substring(index).trim(),
	};
}

const parseLine = (line) => {
	if (!line.length) return;
	return _(line.split('/'))
		.map(s => s.trim())
		.filter(isNotEmpty)
		.map(getTuple)
		.value();
}

export const parseLines = content =>
  _(content.split('\n'))
    .map(cleanUp)
    .filter(isNotEmpty)
    .map(parseLine)
    .value();

