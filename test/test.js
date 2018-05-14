const Nightmare = require('nightmare');
const assert = require('assert');

describe('Load a Page', function () {
     // Recommended: 5s locally, 10s to remote server, 30s from airplane ¯\_(ツ)_/¯
    this.timeout('5s');

    let nightmare = null;
    beforeEach(() => {
        nightmare = new Nightmare();
    });

    describe('/ (Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Menu Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/menu')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Store Info Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/about')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Contact Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/contact')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (Admin Home Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/admin')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add categories Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/admin/addcategories')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });

    describe('/ (ADMIN: Add item Page)', () => {
        it('should load without error', done => {
            nightmare.goto('http://localhost:3000/admin/additem')
                .end()
                .then(function (result) {
                    done();
                })
                .catch(done);
        });
    });
});