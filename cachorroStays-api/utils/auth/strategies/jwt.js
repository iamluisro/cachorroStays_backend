const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/userHotels');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function(tokenPayload, cb) {
      const usersService = new UsersService();

      try {
        const user = await usersService.getUserHotels({
          email: tokenPayload.email
        });
        if (!user) {
          return cb(boom.unauthorized(), false);
        }
        delete user.password;

        cb(null, { ...user, scopes: tokenPayload.scopes });
      } catch (err) {
        return cb(err);
      }
    }
  )
);
