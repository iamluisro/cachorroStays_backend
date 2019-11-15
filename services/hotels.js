const MongoLib = require('../lib/mongo');

class HotelsService {
  constructor() {
    this.collection = 'hotels';
    this.mongoDB = new MongoLib();
  }
  async getHotels() {
    const hotels = await this.mongoDB.getAll(this.collection);
    return hotels;
  }

  async getHotel({ hotelId }) {
    const hotel = await this.mongoDB.get(this.collection, hotelId);
    return hotel;
  }

  async createHotel({ hotel }) {
    const createHotelId = await this.mongoDB.create(this.collection, hotel);
    return createHotelId;
  }

  async updateHotel({ hotelId, hotel }) {
    const updateHotelId = await this.mongoDB.update(
      this.collection,
      hotelId,
      hotel
    );
    return updateHotelId;
  }

  async deleteHotel({ hotelId }) {
    const deleteHotelId = await this.mongoDB.delete(this.collection, hotelId);
    return deleteHotelId;
  }
}

module.exports = HotelsService;
