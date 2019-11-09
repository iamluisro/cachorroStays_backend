const express = require('express');
const { mockHotels } = require('../utils/mocks/mockHotels');

function hotelsApi(app) {
  const router = express.Router();
  app.use('/api/hotels', router);

  router.get('/', async function(req, res, next) {
    try {
      const hotels = await Promise.resolve(mockHotels);
      res.status(200).json({
        data: hotels,
        message: 'hotels listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:hotelId', async function(req, res, next) {
    try {
      const hotel = await Promise.resolve(mockHotels[0]);
      res.status(200).json({
        data: hotel,
        message: 'hotel retrieved'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function(req, res, next) {
    try {
      const createHotelId = await Promise.resolve(mockHotels[0].id);
      res.status(200).json({
        data: createHotelId,
        message: 'hotels created'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:hotelId', async function(req, res, next) {
    try {
      const updateHotelsId = await Promise.resolve(mockHotels[0].id);
      res.status(200).json({
        data: updateHotelsId,
        message: 'hotel updated'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:hotelId', async function(req, res, next) {
    try {
      const deleteHotelsId = await Promise.resolve(mockHotels[0].id);
      res.status(200).json({
        data: deleteHotelsId,
        message: 'hotel deleted'
      });
    } catch (err) {
      next(err);
    }
  });
}

module.exports = hotelsApi;
