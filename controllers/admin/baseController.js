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
            return { "model": db[item], "as" : item}
        });

        if(typeof condition === 'undefined' || condition === null)
            const data = await this.model.findAll({raw: true, include: entities})
                .then( models => {
                    let data = models;
                    return data;
                })
                .catch((err) => err);

        else
            const data = await this.model.findAll({ where: { condition }, raw: true, include: entities})
                .then( models => {
                    let data = models;
                    return data;
                })
                .catch((err) => err);

        return this.response = data;
    }

    async setData(id, values) {

        values.raw = true;
        console.log(id);
        const data = await this.model.update(values, { where: {id} })
            .then( models => {
                let data = models;
                return data;
            })
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
            .catch((err) => err);
        return this.response = data;
    }

    async deleteById(id) {
        //TODO
    }

}

module.exports = Controller;
