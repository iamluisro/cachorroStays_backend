const sinon = require('sinon');

const { mockHotels } = require('../mocks/mockHotels');

const getAllStub = sinon.stub();
getAllStub.withArgs('hotels').resolves(mockHotels);

const createStub = sinon.stub().resolves(mockHotels[0].id);

class MongoLibMock {
  getAll(collection, query) {
    return getAllStub(collection, query);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
};
