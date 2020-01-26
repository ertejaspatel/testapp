class TNResponse {
  data;
  success; //boolean true or false
  errors = []; // array of string or objects
  // totalCount; //X-WP-Total
  // totalPages; //X-WP-TotalPages
  headers; //Object
  status; //status code
  message; // success or failure message string
}

module.exports = TNResponse;
