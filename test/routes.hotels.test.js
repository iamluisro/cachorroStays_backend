const assert = require('assert');
const proxyquire = require('proxyquire');

const {
  mockHotels,
  HotelsServiceMock
} = require('../utils/mocks/mockHotels.js');
const testServer = require('../utils/testServer');

describe('route - movies', function() {
  const route = proxyquire('../routes/hotels', {
    '../services/hotels': HotelsServiceMock
  });

  const request = testServer(route);
  describe('GET /hotels', function() {
    it('should respond with status 200', function(done) {
      request.get('/api/hotels').expect(200, done);
    });

    it('should respond with the list of hotels', function(done) {
      request.get('/api/hotels').end((err, res) => {
        assert.deepEqual(res.body, {
          data: mockHotels,
          message: 'hotels listed'
        });

        done();
      });
    });
  });
});
