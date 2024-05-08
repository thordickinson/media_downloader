const express = require("express");
const cors = require("cors");
const ytdl = require("ytdl-core");
const slugify = require('slugify')

const app = express();
app.use(cors());
app.use(express.static('public'))

app.get("/download", async (req, res) => {
  var URL = req.query.URL;
  const info = await ytdl.getInfo(URL);
  const title = slugify(info.videoDetails.title);
  res.header("Content-Disposition", `attachment; filename="${title}.mp4"`);
  ytdl(URL, {
    format: "mp4",
    filter : 'audioandvideo'
  }).pipe(res);
});

app.listen(3000, () => {
  console.log("Server Works !!! At port 3000");
});
