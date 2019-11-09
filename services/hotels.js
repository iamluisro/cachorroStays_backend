const { mockHotels } = require('../utils/mocks/mockHotels');

class HotelsService {
  async getHotels() {
    const hotels = await Promise.resolve(mockHotels);
    return hotels;
  }

  async getHotel() {
    const hotel = await Promise.resolve(mockHotels[0]);
    return hotel;
  }

  async createHotel() {
    const createHotelId = await Promise.resolve(mockHotels[0].id);
    return createHotelId;
  }

  async updateHotel() {
    const updateHotelId = await Promise.resolve(mockHotels[0].id);
    return updateHotelId;
  }

  async deleteHotel() {
    const deleteHotelId = await Promise.resolve(mockHotels[0].id);
    return deleteHotelId;
  }
}

module.exports = HotelsService;
