"use strict";
let path = require('path');
let db = require(path.join(__basedir,'/models'));

class Controller {

    constructor(modelName) {
        this.model = db[modelName];
        this.response = {};
    }

    async getData() {
        const data = await this.model.findAll({raw: true})
            .then( models => {
                let data = models;
                return data;
            })
            .catch((err) => err);
        return this.response = data;
    }

    async getById(id) {
        const data = await this.model.findOne({id: id, raw: true})
            .then( models => {
                let data = models;
                return data;
            })
            .catch((err) => err);
        return this.response = data;
    }

    async getWithInclude(includes, condition) {

        let entities = includes.forEach(item => {
            return { "model": db[item], "as" : item};
        });

        if(typeof condition === 'undefined' || condition === null)
            return this.response = await this.model.findAll({raw: true, include: entities})
                .then( models => {
                    let data = models;
                    return data;
                })
                .catch((err) => err);

        else
            return this.response = await this.model.findAll({ where: { condition }, raw: true, include: entities})
                .then( models => {
                    let data = models;
                    return data;
                })
                .catch((err) => err);
    }

    async setData(id, values) {

        values.raw = true;
        const data = await this.model.update(values, { where: {id} })
            .then( models => {
                let data = models;
                return data;
            })
            .then( id => this.getById(id))
            .catch((err) => err);
        return this.response = data;
    }

    async createData(values) {

        values.raw = true;
        const data = await this.model.create(values)
            .then( models => {
                let data = models;
                return data;
            })
            .then( id => this.getById(id))
            .catch((err) => err);
        return this.response = data;
    }

    async findOrCreate(values, defaults, args) {
        values.raw = true;
        const data = await this.model.findOrCreate({
            where: values,
            defaults: defaults
        }).spread( (record, created) => {
            if(created){
                if(typeof args !== 'undefined' && args !== null)
                record[args[0]] = args[1]
            }
        }).then( models => {
            let data = models;
            return data;
        })
        .catch((err) => err);
        return this.response = data;
    }

    async deleteById(id) {
        // values.raw = true;
        const data = await this.model.destroy({ where: {id} })
            .then( models => {
                let data = models;
                return data;
            })
            .then( id => this.getById(id))
            .catch((err) => err);
        return this.response = data;
    }
}

module.exports = Controller;
