const Nightmare = require('nightmare');
const assert = require('assert');
const db = require('../models');
// const Sequelize = require('sequelize');
const mocha = require('mocha');

// db.Sequelize = Sequelize;
describe('Load a Page', function () {
    // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('5s');

    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare();
    });

    describe('/ (Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Menu Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/menu')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Store Info Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/about')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Contact Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/contact')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Admin Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add categories Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/addcategories')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add item Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/additem')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Dashboard)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/dashboard')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: site page to edit content)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/editcontent')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: site page home page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/sitehomepage')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Landing page for adding items)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3001/admin/addingitems')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });
//create test
var restaurant={restaurant_name:"phonow"};
 
// creatTable(db.restaurant,restaurant);
// function creatTable( table,data){

    describe('/ (SEQUELIZE : CRUD - CREATE Restaurant)', () => {
        it('It should create Restaurant table', function () {
            return db.sequelize.sync({ force: true }).then(() => {
                return db.restaurant.create({
                    restaurant_name:"phonow"
                }).then(() => { console.log('data created') }).
                    catch(err => { console.log(err) });
                //   done();
            })
        })
    });
// }


    describe('/ (SEQUELIZE : CRUD - CREATE userSecGrps)', () => {
        it('It should create userSecGrps table', function () {
            return db.sequelize.sync().then(() => {
              return db.User_sec_grp.create({ 
                grp_code: "admin",grp_name:"administrator",
                });
              done();
            })    
          })
        }); 
    

    describe('/ (SEQUELIZE : CRUD - CREATE menu_type)', () => {
        it('It should create menu_type table', function () {
            return db.sequelize.sync().then(() => {
                return db.menu_type.create({ MenuType_name: "lunch", MenuType_description: "food for lunch" });
                done();
            })
        })
    });

    describe('/ (SEQUELIZE : CRUD - CREATE menu_category)', () => {
        it('It should create menu_category table', function () {
            return db.sequelize.sync().then(() => {
                return db.menu_category.create({ category_name: "beef noodle soup", MenuType_description: "so yummy" });
                done();
            })
        })
    });
            describe('/ (SEQUELIZE : CRUD - CREATE relation between rsturant and restaurant_hour )', () => {
                it('It should create relation between rsturant and restaurant_hour  ', function () {
                    return db.sequelize.sync().then(() => {
                      return db.restaurant_hour.create({ day_name: "Monday",
                      start_time:"8:00 am",
                      end_time:"6:30 pm",
                      restaurantId:1});
                      done();
                    })    
                  })
            }); 

            describe('/ (SEQUELIZE : CRUD - CREATE relation between user and UserSecGrp  )', () => {
                it('It should create relation between user and UserSecGrp  ', function () {
                    return db.sequelize.sync().then(() => {
                      return db.user.create({ user_first_name: "Yewbdar",
                      user_last_name:"Abera",
                      user_email:"you@me.com",
                      UserSecGrpGrpCode:"admin"});
                      done();
                    })    
                  })
            }); 

            describe('/ (SEQUELIZE : CRUD - CREATE relation between menu_items with menu_type and menu_category )', () => {
                it('It should create relation between menu_items and menu_type  ', function () {
                    return db.sequelize.sync().then(() => {
                      return db.menu_items.create({ item_name_english: "food",
                      item_name_vietnamese:"vihsueksenje",
                      item_price:"10.00",
                      menuTypeId:1,  
                      menuCategoryId:1  
                      });
                      done();
                    })    
                  })
            }); 

            describe('/ (SEQUELIZE : CRUD - CREATE relation between restaurant_contact and restaurant )', () => {
                it('It should create relation between restaurant_contact and restaurant  ', function () {
                    return db.sequelize.sync().then(() => {
                      return db.restaurant_contact.create({ social_contact: "facebook/phnow",
                      contact_email:"phonow@gmail.com",
                      contact_phone:"123123123",
                      restaurantId:1
                      });
                      done();
                    })    
                  })
            }); 


    // update test 

    

});


