const joi = require('@hapi/joi');

const { hotelIdSchema } = require('./hotels');
const { userIdSchema } = require('./users');

const userHotelSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);

const createUserHotelSchema = {
  userId: userIdSchema,
  movieId: hotelIdSchema
};

module.exports = {
  userHotelSchema,
  createUserHotelSchema
};
