"use strict";
let Controller = require('./baseController.js');

let restaurant = {
    getBusinessHours: async () => {
        let hours = new Controller('restaurant_hour');
        return hours.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    getContacts: async () => {
        let item = new Controller('restaurant_contact');
        return item.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    getRestaurant: async () => {
        let item = new Controller('restaurant');
        return item.getData().then(data => data)
            .catch(err => JSON.stringify(err));
    },
    /**
     * TODO add/update/delete operations
     */
};

module.exports = restaurant;