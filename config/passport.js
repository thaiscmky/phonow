const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');

// Load user model
const db = require('../models');

module.exports = function(passport) {
    passport.use(
        new GoogleStrategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true,
        }, (accessToken, refreshToken, profile, done) => {
            // console.log(accessToken);
            // console.log(profile);

            const authUser =  {
                user_unique_id: profile.id,
                email: profile.emails[0].value,
            };
            console.log('AUTHORIZED');
            console.log(authUser);
            // Check for existing user
            db.user.findOne({
                where: {
                    user_email: profile.emails[0].value
                }
            }).then((user) => {
                    if(user) {
                        //return user
                        done(null, user);
                    } else {
                        done(null,user);
                    }

                });
        })
    );

    //Passport serializing and de-serializing
    passport.serializeUser( (user, done) => {
        //null for the error, and the id from the user
        done(null,user.user_email); //user_email is the column name in our DB
    });

    passport.deserializeUser( (email, done) => {
        // Find the id inside our database
        db.user.findOne({
            where: {
                user_email: email
            }
        }).then(
            //Once we get the user, we send NO error and pass the user.
            user => done(null, user)
        )
        .catch( err => console.log('ERROR',err));
    });
};