const express = require('express');
const app = express();
app.use(express.json());

var request = require('request');
var fs = require('fs');

app.use((req, res, next) => { 
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all the requist to access my api
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  next();
});

app.post('/uploadImage', (req, res) =>{

  request.post({
    url: 'https://vectorizer.ai/api/v1/vectorize?mode=test',
    formData: {
      image: fs.createReadStream(req.body.imageURL), // TODO: Replace with your image
      // TODO: Add more upload options here
    },
    auth: {user: 'vkbxcqlkg23qyyp', pass: '7o2rv8ubvrkud6noq4d51sc2d6pb9lmcn3o9dpte2n01s7u9i03s'},
    followAllRedirects: true,
    encoding: null
  }, function(error, response, body) {
    if (error) {
      console.error('Request failed:', error);
    } else if (!response || response.statusCode != 200) {
      console.error('Error:', response && response.statusCode, body.toString('utf8'));
    } else {
      // Save result
      fs.writeFileSync("images/result.svg", body);
      res.status(200).json({
        message: 'Uploaded!'
      });
    }
  });
  
});

module.exports = app;