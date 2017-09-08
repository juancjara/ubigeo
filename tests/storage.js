import assert from 'assert';
import _ from 'lodash';

import {
  saveDepartamento,
  saveProvincia,
  saveDistrito,
  getDepartamentos,
  getProvincias,
  getDistritos,
} from '../src/storage';


describe('storage', () => {

  it('should save departamento, provincias and distritos', () => {
    const departamento = {id: 1, name: 'D'};
    const provincia = {id: 2, name: 'P'};
    const distrito = {id: 3, name: 'Dis'};

    saveDepartamento(departamento);
    saveProvincia(provincia, 1);
    saveDistrito(distrito, 2);

    assert.deepEqual(getDepartamentos(), [{ id: 1, name: 'D', parentId: undefined, parent: {} }]);
    assert.deepEqual(getProvincias(), [{ id: 2, name: 'P', parentId: 1, parent: {...departamento, parentId: undefined}}]);
    assert.deepEqual(getDistritos(), [{ id: 3, name: 'Dis', parentId: 2, parent: {...provincia,  parentId: 1} }]);
  });

});
