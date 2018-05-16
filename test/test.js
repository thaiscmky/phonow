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
   



});

