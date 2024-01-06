require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors(
  {
    origin : "https://instasave-olive.vercel.app",
    methods : ["GET","POST"],
    credentials : true
  }
));

app.post("/", async (req, res) => {
  const link = req.body.link;
  try {
    const response = await axios.request({
      method: "GET",
      url: "https://instagram-downloader-download-instagram-videos-stories1.p.rapidapi.com/",
      params: {
        url: link,
      },
      headers: {
        "X-RapidAPI-Key": process.env.key,
        "X-RapidAPI-Host":process.env.host,
      },
    });
    return res.json(response.data);
  } catch (err) {
    return res.status(err.response.status).json({ message: err.response.data });
  }
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
