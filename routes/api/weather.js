const express = require("express");
const got = require("got");
const router = express.Router();
const { query, validationResult } = require("express-validator");

require("dotenv").config();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get(
  "/",
  [query("lat").isNumeric(), query("lon").isNumeric()],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { lat, lon } = req.query;
      const API_KEY = process.env.API_KEY;
      const url = "https://api.openweathermap.org/data/2.5/weather";
      const response = await got(url, {
        searchParams: { lat, lon, appid: API_KEY },
      });
      const { name, weather, clouds } = JSON.parse(response.body);
      res.json({ name, weather, clouds });
    } catch (err) {
      next(err);
    }
  }
);

router.get("/about", (req, res) => {
  try {
    throw Error("Error happened");
    res.json({ message: "Our weather home page" });
  } catch (err) {
    res.status(400).json({ message: "Bad request" });
  }
});

module.exports = router;
