"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Parse = require("parse");
const R = require("ramda");
/* Baas for database objects */
var PObject;
(function (PObject) {
    /**
     * Returns an extended parse Object constructor
     * @param {string} name
     * @returns {Parse.Object}
     */
    PObject.extendClass = (name) => Parse.Object.extend(name);
    PObject.createEntity = (className) => new Parse.Object(name);
    /**
    * Returns a chainable version for setting properties and saving the object.
    * @param {Parse.Object} entity
    * @param {string} property
    * @param {*} value
    * @returns {setOBj}
    */
    PObject.set = (entity, property, value) => {
        console.log("Property set", property);
        entity.set(property, value);
        const cSetProperty = R.curry(PObject.set);
        return {
            set: cSetProperty(entity),
            save: R.bind(entity.save, entity),
            entity: entity
        };
    };
    /**
    * Removes a property from the Parse.Object; must be saved
    * to take effect on the Cloud.
    * @param {Parse.Object} entity
    * @param {string} property
    */
    PObject.unset = (entity, property) => {
        return entity.unset(property);
    };
    PObject.get = (entity, property) => {
        return entity.get(property);
    };
    /**
     * Destroys the parse object removing it completely from the cloud.
     * @param {Parse.Object} entity
     * @returns {Promise<Parse.Object>}
     */
    PObject.destroy = (entity) => {
        return entity.destroy();
    };
})(PObject = exports.PObject || (exports.PObject = {}));
var PQuery;
(function (PQuery) {
    PQuery.setupQueryEqualTo = (className, field) => {
        const query = new Parse.Query(PObject.extendClass(className));
        const cEqualTo = R.curry(query.equalTo);
        return cEqualTo(field);
    };
    PQuery.setupQueryNotEqualTo = (className, field) => {
        const query = new Parse.Query(PObject.extendClass(className));
        const cNotEqualTo = R.curry(query.notEqualTo);
        return cNotEqualTo(field);
    };
    PQuery.getElementsEqualTo = (className, field, value) => {
        return PQuery.setupQueryEqualTo(className, field)(value).find();
    };
    PQuery.getFirstElementEqualTo = (className, field, value) => {
        return PQuery.setupQueryEqualTo(className, field)(value).first();
    };
    // export const 
})(PQuery = exports.PQuery || (exports.PQuery = {}));
