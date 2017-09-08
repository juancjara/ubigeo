'use strict'
var _ = require('lodash');

var rows = [
	`" 01 Lima /  / "`,
	`" 01 Lima / 50 Lima /"`,
	`" 01 Lima / 51 barranca /"`,
	`" 01 Lima / 50 Lima / 202 La Molina"`,
	`" 01 Lima / 50 Lima / 203 sna isidro"`,
	`" 02 Arequipa / / "`,
	`" 02 Arequipa / 63 arequpa / "`,
	`" 02 Arequipa / 64 caylloma/ "`,
	`" 02 Arequipa / 63 arequipa / 267 cercado "`,
]


var argsToArray = function(args) {
	  return args = Array.prototype.slice.call(args);
};

var partial = function(fn) {
	  var pastArgs = argsToArray(arguments).slice(1);
	    return function() {
		        var newArgs = argsToArray(arguments);
			    return fn.apply(null, pastArgs.concat(newArgs));
			      }
};
//
//storage
//const

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
		let parent = {id: '-', name: '-'};
		if (entity.parentId !== undefined) {
			parent = entities[entity.parentId];
		}
		return Object.assign({}, entity, {parent});

  }


const addItem = (key, item, parentId) => {
	if (!entities[item.id]) {
		entities[item.id] = Object.assign({}, item, {parentId}); 
		ids[key].push(item.id);
	}
};

const addDepartamento = _.partial(addItem, DEPARTAMENTO, _, undefined);
const addProvincia = _.partial(addItem, PROVINCIA, _, _);
const addDistrito = _.partial(addItem, DISTRITO, _, _);

const getEntities = KEY => ids[KEY].map(getEntityWithParent)

const getDeparmentos = () => getEntities(DEPARTAMENTO);  
const getProvincias = () => getEntities(PROVINCIA);  
const getDistritos = () => getEntities(DISTRITO);


var getTuple = (block) => {
	if (!block.length) return;
	const index = block.indexOf(' ');
	return {
		id: block.substring(0, index).trim(),
		name: block.substring(index).trim(),
	}
}

const items = {};

const cleanUp = line => line.replace(/"/g, '').trim();

const parseLine = (line) => {
	if (!line.length) return;
	return _(line.split('/'))
		.map(s => s.trim())
		.filter(s => s.length)
		.map(getTuple)
		.value();
}

const storeData = tuples => {
	addDepartamento(tuples[0]);
	if (tuples[1]) {
	  addProvincia(tuples[1], tuples[0].id);
	}
	if (tuples[1] && tuples[2]) {
	  addDistrito(tuples[2], tuples[1].id);
	}
}


_(rows)
  .map(cleanUp)
  .map(parseLine)
  .forEach(storeData);

const log = (item) => {
  console.log(item.id, item.name, item.parent.id, item.parent.name);
}
getDeparmentos().forEach(log)
getProvincias().forEach(log)
getDistritos().forEach(log)

