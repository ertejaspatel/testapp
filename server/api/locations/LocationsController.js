const Country = require("../../../models/Country");
const catchAsync = require("../../../utils/CatchAsync");

exports.getAllCountries = catchAsync(async(req, res, next) => {
    const countries = await Country.find({}).select("id name iso2");
    return res.status(200).json({
        countries: countries
    })
});

exports.getCountry = catchAsync(async(req,res, next)=>{
    const country = await Country.findOne({name: req.params.country});
    return res.status(200).json({
        country
    })
});