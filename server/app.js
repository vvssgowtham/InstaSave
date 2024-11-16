require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: "https://instasave-olive.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.post("/download", async (req, res) => {
  const link = req.body.link;

  const options = {
    method: "POST",
    url: "https://instagram-bulk-scraper-latest.p.rapidapi.com/media_download_from_url",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY,
      "x-rapidapi-host": process.env.RAPIDAPI_HOST,
      "Content-Type": "application/json",
    },
    data: {
      url: link,
    },
  };

  try {
    const response = await axios.request(options);
    console.log("API response:", response.data);
    res.json({ download_url: response.data.data.main_media_hd });
  } catch (error) {
    console.error("Error in API request:", error);
    res.status(500).send("Error downloading media");
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
