const express = require('express');
const HotelsService = require('../services/hotels');

function hotelsApi(app) {
  const router = express.Router();
  app.use('/api/hotels', router);

  const hotelsService = new HotelsService();

  router.get('/', async function(req, res, next) {
    try {
      const hotels = await hotelsService.getHotels();
      res.status(200).json({
        data: hotels,
        message: 'hotels listed'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:hotelId', async function(req, res, next) {
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
  });

  router.post('/', async function(req, res, next) {
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
  });

  router.put('/:hotelId', async function(req, res, next) {
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
  });

  router.delete('/:hotelId', async function(req, res, next) {
    const { hotelId } = req.params;
    try {
      const deleteHotelsId = await hotelsService.updateHotel({ hotelId });
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
