import _ from 'lodash';

const DEPARTAMENTO = 'departamento';
const PROVINCIA = 'provincia';
const DISTRITO = 'distrito';
const entities = {};

const ids = {
  [DEPARTAMENTO]: [],
  [PROVINCIA]: [],
  [DISTRITO]: [],
};


const getEntityWithParent = id => {
	const entity = entities[id];
	let parent = {};
	if (entity.parentId !== undefined) {
		parent = entities[entity.parentId];
	}
	return {...entity, parent};
};

const getEntities = KEY => ids[KEY].map(getEntityWithParent);

const saveItem = (key, item, parentId) => {
	if (!entities[item.id]) {
		entities[item.id] = {...item, parentId};
		ids[key].push(item.id);
	}
};

export const saveDepartamento = _.partial(saveItem, DEPARTAMENTO, _, undefined);
export const saveProvincia = _.partial(saveItem, PROVINCIA, _, _);
export const saveDistrito = _.partial(saveItem, DISTRITO, _, _);


export const getDepartamentos = () => getEntities(DEPARTAMENTO);
export const getProvincias = () => getEntities(PROVINCIA);
export const getDistritos = () => getEntities(DISTRITO);
