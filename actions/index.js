// const _ = require("lodash");
// const { ApiClient } = require("../Agent");
// const vendorAuthApiController = require("../server/api/vendors/AuthController");
// console.log("ApiClient", ApiClient);

// export const getAdverts = async (req) => {
//   // const result = await vendorAuthApiController.isLoggedIn(req);
//   console.log("Advert Called", result);
//   // return ApiClient.get("api/vendor/adverts").then(res => []);
//   return [];
// };

// export const getAdvertById = async id => {
//   const data = await getAdverts();
//   return _.find(data, { id: id });
// };

// export const getImages = async () => {
//   const data = await getAdverts();
//   return data.map(d => {
//     return { id: "image-" + d.id, url: d.image, name: d.name };
//   });
// };


