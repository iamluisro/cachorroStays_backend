const express = require('express');

const UserHotelsServices = require('../services/userHotels');
const validationHandler = require('../utils/middleware/validationHandler');

const { hotelIdSchema } = require('../utils/schemas/hotels');
const { userIdSchema } = require('../utils/schemas/users');
const { createUserHotelSchema } = require('../utils/schemas/userHotels');

function userHotelsApi(app) {
  const router = express.Router();
  app.user('api/users-hotels', router);

  const userHotelsService = new UserHotelsServices();

  router.get(
    '/',
    validationHandler({ userId: userIdSchema }, 'query'),
    async function(req, res, next) {
      const { userId } = req.query;

      try {
        const userHotels = await UserHotelsServices.getUserHotels({ userId });

        res.status(200).json({
          data: userHotels,
          message: 'user hotels listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/:userHotelId',
    validationHandler(createUserHotelSchema),
    async function(req, res, next) {
      const { body: userHotel } = req;

      try {
        const createdUserHotelId = await userHotelsService.createUserHotel({
          userHotel
        });

        res.status(201).json({
          data: createdUserHotelId,
          message: 'user hotel created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:userHotelId',
    validationHandler({ userHotelId: hotelIdSchema }, 'params'),
    async function(req, res, next) {
      const { userHotelId } = req.params;

      try {
        const deleteUserHotelId = await userHotelsService.deleteUserHotel({
          userHotelId
        });

        res.status(200).json({
          data: deleteUserHotelId,
          message: 'user hotel deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = userHotelsApi;
