import axios from "axios";

const BASE_URL = "http://localhost:3000/";

const ApiClient = axios.create({
  baseURL: BASE_URL
});

ApiClient.defaults.withCredentials = true;
ApiClient.defaults.headers.post["accept"] = "application/json";
ApiClient.defaults.headers.post["Content-Type"] = "application/json";

ApiClient.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (error.response.status === 401) {
      console.log("unauthorized, logging out ...");
    }
    return Promise.reject(error.response.data);
  }
);

const VendorAgent = {
  createVendor: (vendor)=>{
    return ApiClient.post("/api/vendors", vendor);
  }
}

const LocationsAgent = {
  getAllCountries: () => {
    return ApiClient.get("/api/locations/countries");
  },
  getCountry: (country)=>{
    return ApiClient.get(`/api/locations/countries/${country}`)
  }
}

module.exports = {
  BASE_URL,
  ApiClient,
  VendorAgent: VendorAgent,
  LocationsAgent: LocationsAgent
};