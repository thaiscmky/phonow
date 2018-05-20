"use strict";

let db = require("../../models");

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
