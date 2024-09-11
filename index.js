const express = require('express'); 
const bodyParser = require('body-parser');    
const cors = require('cors'); 
const getHostname = require("./utils/getHostname");
const { ndown } = require("nayan-media-downloader");
const { tikdown } = require("nayan-media-downloader");
const { ytdown } = require("nayan-media-downloader");
const { twitterdown } = require("nayan-media-downloader");
const {GDLink} = require("nayan-media-downloader");
const {pintarest} = require("nayan-media-downloader");
const { likee} = require("nayan-media-downloader");
const { threads } = require("nayan-media-downloader");

const app = express();
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://video-downloader-nu-seven.vercel.app'],
  methods: ['GET', 'POST'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));



function downloadFromGeneric(url) { 
  fetch(url)
    .then((response) => { 
      if (!response.ok) {
        throw new Error('Network response was not ok');
      } 
      return response.blob();
    })
    .then((blob) => { 
      const blobUrl = URL.createObjectURL(blob); 
      const a = document.createElement('a');
      a.href = blobUrl; 
      const filename = url.split('/').pop();
      a.download = filename; 
      document.body.appendChild(a); 
      a.click(); 
      document.body.removeChild(a); 
      URL.revokeObjectURL(blobUrl);
    })
    .catch((error) => {
      console.error('There was an error with the fetch operation:', error);
    });
}
app.post('/video-downloader' , async (req, res) => {
    const {url} = req.body;

    if(!url){
        res.status(400).json({error: 'Please provide a valid url'});
    }
     
      const hostname = getHostname(url);
      console.log(hostname);
      let downloadResult;
    
      try {
        if (hostname === "facebook.com") {
          downloadResult = await ndown(url);
          return  res.json({
            status: "success",
            message: "your Facebook Video Download is going to Start ..",
            data: downloadResult,
            type: "Facebook"
          });
        }else if (hostname === "fb.watch") {
            downloadResult = await ndown(url);
            return  res.json({
              status: "success",
              message: "your Facebook Video Download is going to Start ..",
              data: downloadResult,
              type: "Facebook"
            });
          } else if (hostname === "instagram.com") {
          downloadResult = await ndown(url); 
          return  res.json({
            status: "success",
            message: "your Instagram Video Download is going to Start ..",
            data: downloadResult,
            type: "Instagram"
          });
        } else if (hostname === "drive.google.com") {
          downloadResult = await GDLink(url);
          console.log(downloadResult);
          return  res.json({
            status: "success",
            message: "your Google Drive Video Download is going to Start ..",
            data: downloadResult,
            type: "Google_Drive"
          });
        } else if (hostname === "likee.video") {
          downloadResult = await likee(url);
          return  res.json({
            status: "success",
            message: "your Likee Video Download is going to Start ..",
            data: downloadResult,
            type: "Likee"
          });
        } else if (hostname === "pin.it") {
          downloadResult = await pintarest(url);
          console.log(downloadResult);
          return  res.json({
            status: "success",
            message: "your Pinterest Video Download is going to Start ..",
            data: downloadResult,
            type: "Pinterest"
          });
        } else if (hostname === "threads.net") {
          downloadResult = await threads(url);
          return  res.json({
            status: "success",
            message: "your Threads Video Download is going to Start ..",
            data: downloadResult,
            type: "Thread"
          });
        } else if (hostname === "tiktok.com") {
          downloadResult = await  tikdown(url);
          return  res.json({
            status: "success",
            message: "your Tiktok Video Download is going to Start ..",
            data: downloadResult,
            type: "Tiktok"
          });
        } else if (hostname === "youtube.com" || hostname === "youtu.be") {
          downloadResult = await ytdown(url);
          return  res.json({
            status: "success",
            message: "your Youtube Video Download is going to Start ..",
            data: downloadResult,
            type: "Youtube"
          });
        } else if (hostname === "twitter.com") {
          downloadResult = await twitterdown(url);
          return  res.json({
            status: "success",
            message: "your Twitter Video Download is going to Start ..",
            data: downloadResult,
            type: "Twitter"
          });
        } else {
          downloadResult = await downloadFromGeneric(url);
          return  res.json({
            status: "success",
            message: "your Video  Download is going to Start ..",
            data: downloadResult,
            type: "Normal"
          });
        }
      } catch (error) {
        res.status(500).json({ error: "Failed to download video" });
      }
    }
)

app.get('/', (req, res) => {
  console.log('GET request received at the server');
  res.send('Welcome to the Video Downloader API!');
});

app.listen(8081, () => {
  console.log('Server running on 8081');
});