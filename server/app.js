const express = require('express');
const app = express();
const fs = require('fs');
const sharp = require('sharp');
var request = require('request');

app.use(express.json({ limit: '10mb' }));

app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/uploadImage', async (req, res) => {
  try {
    const extention = req.body.extention;
    const base64Data = req.body.imageURL;
    const imageBuffer = Buffer.from(base64Data, 'base64');
    // Resize the image using sharp
    const resizedBuffer = await sharp(imageBuffer)
      .resize({
        width: req.body.width,
        height: req.body.height,
      }).toBuffer();

    // Save the resized image to the server
    fs.writeFile('uploaded/image.png', resizedBuffer, 'base64', (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to save the image' });
      }

      // Make the POST request after the image has been saved
      request.post({
        url: `https://vectorizer.ai/api/v1/vectorize?mode=test&output.file_format=${extention}`,
        formData: {
          image: fs.createReadStream('uploaded/image.png'),
        },
        auth: { user: 'vkbxcqlkg23qyyp', pass: '7o2rv8ubvrkud6noq4d51sc2d6pb9lmcn3o9dpte2n01s7u9i03s' },
        followAllRedirects: true,
        encoding: null
      }, function (error, response, body) {
        if (error) {
          console.error('Request failed:', error);
        } else if (!response || response.statusCode != 200) {
          console.error('Error:', response && response.statusCode, body.toString('utf8'));
        } else {
          // Save result
          fs.writeFileSync(`../client/public/images/result.${extention}`, body);
          res.status(200).json({
            message: 'Uploaded!'
          });
        }
      });
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Failed to process the image' });
  }
});

module.exports = app;
