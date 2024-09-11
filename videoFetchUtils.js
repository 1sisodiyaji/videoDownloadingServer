const axios = require('axios');
const ytdl = require('ytdl-core');
const instagramGetUrl = require("priyansh-ig-downloader")

const getVideoInfo = async (url) => {
  if (ytdl.validateURL(url)) {
    // Handle YouTube videos
    const info = await ytdl.getInfo(url);
    const videoUrl = ytdl.chooseFormat(info.formats, { quality: 'highest' }).url;

    return {
      title: info.videoDetails.title,
      videoUrl,
      downloadUrl: videoUrl,
    };
  } else if (url.includes('instagram.com')) { 
    const download = await instagramGetUrl(url);
    console.log(download);
    const { url_list} = download;

    return {
      url_list
    };
  } else {
    throw new Error('Unsupported URL');
  }
};

module.exports = { getVideoInfo };