const joi = require('@hapi/joi');

const hotelIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/);
const hotelNameSchema = joi.string().max(80);
const hotelImgSchema = joi.string().uri();
const hotelDescriptionSchema = joi.string().max(300);
const hotelRatingSchema = joi.string().max(5);
const hotelCostSchema = joi
  .number()
  .min(0)
  .max(5000);
const hotelCurrencySchema = joi.string().max(3);
const hotelWebsiteSchema = joi.string().uri();
const hotelAddressSchema = joi.string().max(300);
const hotelPicksUpDogSchema = joi.boolean();
const yearEstablishedSchema = joi
  .number()
  .min(1880)
  .max(2077);
//
//const hotelTagsSchema = joi.array().items(joi.string().max(50));

const createHotelSchema = {
  hotelName: hotelNameSchema.required(),
  hotelImg: hotelImgSchema.required(),
  hotelDescription: hotelDescriptionSchema.required(),
  hotelRating: hotelRatingSchema.required(),
  costPerNight: hotelCostSchema.required(),
  currency: hotelCurrencySchema.required(),
  hotelWebsite: hotelWebsiteSchema.required(),
  hotelAddress: hotelAddressSchema.required(),
  picksUpDog: hotelPicksUpDogSchema.required(),
  yearEstablished: yearEstablishedSchema.required()
  //tags: hotelTagsSchema
};

const updateHotelSchema = joi.object({
  hotelName: hotelNameSchema,
  hotelImg: hotelImgSchema,
  hotelDescription: hotelDescriptionSchema,
  hotelRating: hotelRatingSchema,
  costPerNight: hotelCostSchema,
  currency: hotelCurrencySchema,
  hotelWebsite: hotelWebsiteSchema,
  hotelAddress: hotelAddressSchema,
  picksUpDog: hotelPicksUpDogSchema,
  yearEstablished: yearEstablishedSchema
  //tags: hotelTagsSchema
});

module.exports = {
  hotelIdSchema,
  createHotelSchema,
  updateHotelSchema
};
