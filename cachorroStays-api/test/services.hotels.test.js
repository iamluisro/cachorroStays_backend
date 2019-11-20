const assert = require('assert');
const proxyquire = require('proxyquire');

const { MongoLibMock, getAllStub } = require('../utils/mocks/mongoLib');

const { mockHotels } = require('../utils/mocks/mockHotels');

describe('services - hotels', function() {
  const HotelsServices = proxyquire('../services/hotels', {
    '../lib/mongo': MongoLibMock
  });

  const hotelsService = new HotelsServices();

  describe('when getHotels method is called', async function() {
    it('should call the getall MongoLib method', async function() {
      await hotelsService.getHotels({});
      assert.strictEqual(getAllStub.called, true);
    });

    it('should return an array of hotels', async function() {
      const result = await hotelsService.getHotels({});
      const expected = mockHotels;
      assert.deepEqual(result, expected);
    });
  });
});
