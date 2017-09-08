import { createTds } from '../src/templates';

import assert from 'assert';

const paths = ['id', 'name', 'parent.id', 'parent.name'];

describe('templates', () => {

  it('should create tds when item has parent', () => {
    const item = {id: 1, name: 'A', parent: {id: 2, name: 'B'}};
    const tds = createTds(paths, item);
    const expected = '<td>1</td><td>A</td><td>2</td><td>B</td>';

    assert.equal(tds, expected);
  });

  it('should create tds with default - when item does not have parent', () => {
    const item = {id: 1, name: 'A'};
    const tds = createTds(paths, item);
    const expected = '<td>1</td><td>A</td><td>-</td><td>-</td>';

    assert.equal(tds, expected);
  });

});
