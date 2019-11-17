const MongoLib = require('../lib/mongo');

class UserHotelsServices {
  constructor() {
    this.collection = 'user-hotels';
    this.mongoDB = new MongoLib();
  }

  async getUserHotels({ userId }) {
    const query = userId && { userId };
    const userHotels = await this.mongoDB.getAll(this.collection, query);

    return userHotels || [];
  }

  async createUserHotel({ userHotel }) {
    const createdUserHotelId = await this.mongoDB.create(
      this.collection,
      userHotel
    );
    return createdUserHotelId;
  }

  async deleteUserHotel({ userHotelId }) {
    const deletedUserHotelId = await this.mongoDB.delete(
      this.collection,
      userHotelId
    );
    return deletedUserHotelId;
  }
}

module.exports = UserHotelsServices;
