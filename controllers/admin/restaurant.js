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
    udpatetRestaurantHours: async (values) => {
        let hours = values.map(value => {
            let data = {
                day_name: value.day_name,
                start_time: value.start_time,
                end_time: value.end_time,
                isActive: true //TODO implement toggle logic
            };
            return data;
        });
        let restauranthour = new Controller('restaurant_hour');

        async function insertData (hours) {
            const transaction = hours.map(async hours => {
                const response = await restauranthour.findOrCreate(hour, hour).then(hour => { return {"id": hour.id}; });
                return response.json();
            }).catch(err => JSON.stringify(err));

            const hours = await Promise.all(transaction);
            return hours;
        }

        return insertData(hours);
    }
};

module.exports = restaurant;