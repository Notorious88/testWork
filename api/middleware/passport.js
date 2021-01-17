const LocalStrategy = require('passport-local').Strategy

const {USER} = require("../../database/model/USER")

const crypt = require("../utils/crypt")

module.exports = (passport) => {
    passport.use(
        new LocalStrategy({ usernameField: "name" },  (name, password, done) => {
            USER.find({name: name})
                .then(result => {
                if (!result[0]) {
                    return done(null, false);
                }

                if(password === crypt.decrypt(result[0].password)){
                        return done(null, result[0]);
                    } else {
                        return done(null, false);
                    }
            });
        })
    );

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser((id, done) => {
        USER.findById(id, (err, user) => done(err, user));
    });
};
