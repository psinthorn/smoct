const googleStrategy = require('passport-google-oauth20');
const mongoose = require('mongoose');
const keys = require('./key');

//load User model
// require('../models/Users');
const User = mongoose.model('user');

module.exports = function(passport){
    passport.use(
       new googleStrategy({
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback',
        proxy: true
    }, (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken);
        // console.log(profile);

        const image = profile.photos[0].value.substring(0, profile.photos[0].value.indexOf('?'));
        // console.log(image);

        const newUser = {
            googleID: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            image: image
        }

        //Check existing user on mongDB or create newUser of not
        User.findOne({
            googleID: profile.id
        })
        .then(user => {
            if(user){
                //if user found
                done(null, user);
                
            }else{
                //create new user
                new User(newUser).save()
                .then(user, () => {
                    done(null, user);
                })
            }
        });

    })
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then(user => done(null, user));
    });


};