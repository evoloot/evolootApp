import * as Parse from 'parse';
import * as R from 'ramda';
interface setObj {
  set: R.CurriedFunction2<string, any, setObj>
  save: () => Promise<Parse.Object>
  entity: Parse.Object
}
/* Baas for database objects */

export namespace PObject {
  /**
   * Returns an extended parse Object constructor
   * @param {string} name
   * @returns {Parse.Object}
   */
  export const extendClass = (name:string) =>  Parse.Object.extend(name);
  export const createEntity = (className:string) => new Parse.Object(name);
   /**
   * Returns a chainable version for setting properties and saving the object.
   * @param {Parse.Object} entity
   * @param {string} property
   * @param {*} value
   * @returns {setOBj}
   */
  export const set = (entity:Parse.Object, property:string, value):setObj => {
    console.log("Property set", property);
    entity.set(property, value);
    const cSetProperty = R.curry(set);
    return {
      set: cSetProperty(entity),
      save: R.bind(entity.save, entity),
      entity:entity
    }
  }

   /**
   * Removes a property from the Parse.Object; must be saved
   * to take effect on the Cloud.
   * @param {Parse.Object} entity
   * @param {string} property
   */
  export const unset = (entity: Parse.Object, property:string) => {
    return entity.unset(property);
  }

  export const get = (entity: Parse.Object, property:string) => {
    return entity.get(property);
  }

  /**
   * Destroys the parse object removing it completely from the cloud.
   * @param {Parse.Object} entity
   * @returns {Promise<Parse.Object>}
   */
  export const destroy = (entity: Parse.Object) => {
    return entity.destroy();
  }
}

export namespace PQuery {
  export const setupQueryEqualTo = (className:string, field:string) => {
    const query = new Parse.Query(PObject.extendClass(className));
    const cEqualTo = R.curry(query.equalTo);
    return cEqualTo(field);
  }

  export const setupQueryNotEqualTo = (className:string, field:string) => {
    const query = new Parse.Query(PObject.extendClass(className));
    const cNotEqualTo = R.curry(query.notEqualTo);
    return cNotEqualTo(field);
  }
  export const getElementsEqualTo = (className:string, field:string, value) => {
    return setupQueryEqualTo(className, field)(value).find();
  }
  export const getFirstElementEqualTo = (className:string, field:string, value) => {
    return setupQueryEqualTo(className, field)(value).first();
  }

  // export const 
}