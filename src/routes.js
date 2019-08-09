
var express = require("express"),
router = express.Router();
var path = require('path');
const requestAPI = require('request');
const getJSON = require('./getJSON')

const googleAuth = require('google-oauth-jwt');
var accessToken = "";

generateAccessToken()
.then(res => console.log(res))

console.log('Getting Routes Ready!');
var config = require("../config");

router.get('/', function (req, res) {
console.log("Root page hit!")
res.sendFile(path.join(__dirname + '/../views/index.html'));
});

router.post("/webhook", async (req, res) => {
dialogflowApi(accessToken, req)
.then(body => {
  getJSON.makeJSON(body)
  .then(result => {
    res.send(result);
  })
    
})
});

var dialogflowApi = (accessToken, req) => {
var options = {
    method: 'POST',
    url: 'https://dialogflow.googleapis.com/v2/projects/v2example-npkbti/agent/sessions/fb2e77d.47a0479900504cb3ab4a1f626d:detectIntent',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    },
    body: { queryInput: { text: { text: req.body.query, languageCode: 'en-US' } } },
    json: true
};

return new Promise (async (resolve) => {
    await requestAPI(options, function (error, response, body) {
        if (!error) {
            if (body.hasOwnProperty("error")) {
                // Generate token
                generateAccessToken()
                .then(token => {
                    dialogflowApi(token, req)
                })
            }
            // console.log(JSON.stringify(body));
            resolve(body);
        }
    });
})
}


function generateAccessToken() {
 return new Promise((resolve) => {
  googleAuth.authenticate(
   {
    email: "Please Enter client email",
    key: "Please Enter private key",
    scopes: ['https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/dialogflow'],
   },
   (err, token) => {
accessToken = token;
    resolve(token);
   },
  );
 });
}

module.exports = router