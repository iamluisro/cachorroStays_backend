const express = require('express');
const passport = require('passport');
const HotelsService = require('../services/hotels');
const {
  hotelIdSchema,
  createHotelSchema,
  updateHotelSchema
} = require('../utils/schemas/hotels');
const cacheResponse = require('../utils/cacheResponse');
const {
  FIVE_MINUTES_IN_SECONDS,
  SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');
const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationHandler = require('../utils/middleware/scopesValidationHandler');

require('../utils/auth/strategies/jwt');

//JWT Strategy
function hotelsApi(app) {
  const router = express.Router();
  app.use('/api/hotels', router);

  const hotelsService = new HotelsService();

  router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    scopesValidationHandler(['read:hotels']),
    async function(req, res, next) {
      cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
      try {
        const hotels = await hotelsService.getHotels();
        res.status(200).json({
          data: hotels,
          message: 'hotels listed'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.get(
    '/:hotelId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ hotelId: hotelIdSchema }, 'params'),
    scopesValidationHandler(['read:hotels']),
    async function(req, res, next) {
      cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
      const { hotelId } = req.params;

      try {
        const hotel = await hotelsService.getHotel({ hotelId });
        res.status(200).json({
          data: hotel,
          message: 'hotel retrieved'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.post(
    '/',
    passport.authenticate('jwt', { session: false }),
    validationHandler(createHotelSchema),
    scopesValidationHandler(['create:hotels']),
    async function(req, res, next) {
      const { body: hotel } = req;
      try {
        const createHotelId = await hotelsService.createHotel({ hotel });
        res.status(200).json({
          data: createHotelId,
          message: 'hotels created'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.put(
    '/:hotelId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ hotelId: hotelIdSchema }, 'params'),
    validationHandler({ updateHotelSchema }),
    scopesValidationHandler(['update:hotels']),
    async function(req, res, next) {
      const { hotelId } = req.params;
      const { body: hotel } = req;

      try {
        const updateHotelsId = await hotelsService.updateHotel({
          hotelId,
          hotel
        });
        res.status(200).json({
          data: updateHotelsId,
          message: 'hotel updated'
        });
      } catch (err) {
        next(err);
      }
    }
  );

  router.delete(
    '/:hotelId',
    passport.authenticate('jwt', { session: false }),
    validationHandler({ hotelId: hotelIdSchema }, 'params'),
    scopesValidationHandler(['delete:hotels']),
    async function(req, res, next) {
      const { hotelId } = req.params;
      try {
        const deleteHotelId = await hotelsService.deleteHotel({ hotelId });
        res.status(200).json({
          data: deleteHotelId,
          message: 'hotel deleted'
        });
      } catch (err) {
        next(err);
      }
    }
  );
}

module.exports = hotelsApi;
