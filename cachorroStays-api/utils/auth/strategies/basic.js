const passport = require('passport');
const { BasicStrategy } = require('passport-http');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
//const { config } = require('../../../config');
//const axios = require('axios');

const UsersService = require('../../../services/users');

passport.use(
  new BasicStrategy(async function(email, password, cb) {
    const userServices = new UsersService();
    try {
      const user = await userServices.getUser({ email });

      if (!user) {
        return cb(boom.unauthorized(), false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false);
      }

      delete user.password;

      return cb(null, user);
    } catch (err) {
      return cb(err);
    }
  })

  /* new BasicStrategy(async function(email, password, cb) {
    try {
      const { data, status } = await axios({
        url: `${config.apiUrl}/api/auth/sign-in`,
        method: 'post',
        auth: {
          password,
          username: email
        },
        data: {
          apiKeyToken: config.publicApiKeysToken
        }
      });

      if (!data || status !== 200) {
        return cb(boom.unauthorized(), false);
      }

      return cb(null, data);
    } catch (error) {
      cb(error);
    }
  }) */
);
