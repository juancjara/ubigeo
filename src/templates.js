import _ from 'lodash';

const PATHS = ['id', 'name', 'parent.id', 'parent.name'];
const LABELS = ['Código', 'Nombre', 'Código Padre', 'Descripción Padre'];
const headers = LABELS.map(l => `<th>${l}</th>`).join('');

export const createTds = (paths, item) =>
  paths.reduce(
    (acc, path) => `${acc}<td>${_.get(item, path, '-')}</td>`,
    ''
  );

export const generateTable = (items, name) => {
  const thead = `<thead><tr>${headers}<tr></thead>`;

  const trs = items
          .map(_.partial(createTds, PATHS, _))
          .map(tds => `<tr>${tds}</tr>`)
          .join('');

  const tbody = `<tbody>${trs}</tbody>`;
  return `<h3>${name}</h3><table border="1">${thead}${tbody}</table>`;
};
