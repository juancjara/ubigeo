import _ from 'lodash';

import {
  saveDepartamento,
  saveProvincia,
  saveDistrito,
  getDepartamentos,
  getProvincias,
  getDistritos,
} from './storage';
import { generateTable } from './templates';
import { parseLines } from './parser';

const app = document.querySelector('#app');
const drawTables = (...rest) => app.innerHTML = rest.join('');

const storeLine = tuples => {
	saveDepartamento(tuples[0]);
	if (tuples[1]) {
	  saveProvincia(tuples[1], tuples[0].id);
	}
	if (tuples[1] && tuples[2]) {
	  saveDistrito(tuples[2], tuples[1].id);
	}
};

const processFile = (content) => {
  const linesParsed = parseLines(content);

  _.forEach(linesParsed, storeLine);

  const departamentos = generateTable(getDepartamentos(),'Departamentos');
  const provincias = generateTable(getProvincias(), 'Provincias');
  const distritos = generateTable(getDistritos(), 'Distritos');

  drawTables(departamentos, provincias, distritos);
};

const fileLoaded = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => processFile(e.target.result);
  reader.readAsText(file);
};

document.querySelector('#file').addEventListener('change', fileLoaded);
