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
    method: 'GET',
    url: 'https://instagram-post-reels-stories-downloader-api.p.rapidapi.com/instagram/',
    params: {
      url: link
    },
    headers: {
      'x-rapidapi-key': process.env.RAPIDAPI_KEY,
      'x-rapidapi-host': process.env.RAPIDAPI_HOST
    }
  };
  
  try {
    const response = await axios.request(options);
    const videoUrl = response.data.result[0].url;
    res.json({ videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while processing your request.");
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
