
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
res.sendFile(path.join(__dirname + '/../views/website.html'));
});

router.get('/chat', function (req, res) {
console.log("Test page hit!")
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
    email: "v2example-npkbti@appspot.gserviceaccount.com",
    key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCJ+1i0KoBsqqs/\nSu+qpZnnif54u8QHWnIx0ELayGKAUajZHuS2j7HF9BDk8fGJiL+YHHMtY9U+srjD\nc9Awrx5vnOS1roxtMZsXNn0KCQY88q6W1fdFeHt/VpqZSZV2puWBvIn/JgtFWpzz\nMma8q886dzRbFEQfq5KkSqAMWLtog7hcIDKndQw4zcPnIohMtiGRYwBbf4ySxjFQ\nWB4xbtFP3pmsae8rJnzsTR8/gSD7necn58nVKJx2mcozlN5bGfms2oPq5c/4pXoT\ndAOEOn9gfd63y3QHOWRryo5mSiutHE6iaLuDGtnlxo9rKCSN2sOwLaGdwxIquGTk\nOIi+ckMRAgMBAAECggEANnWcWJvPzVP9PAFtH7q1yHOoGuntIIPbv3p18JkXe5L/\nZBaz6bREU5+VjW9KyGBPUo+kC/2zvEfY8dfDi3uKtT3E7UpjxXNHRb2tU2kla6fT\nLdhsfKBliehaI3cuBUMxIWgTRT+0Qh7WBIzXjM74/xfuc6ZHjwJuYebMTaM18LU8\nEZ2s//kdHOHXIQBjuIpvg4hs2QfH1BM6Zh1hUi2Qt3WNs/GljmUFdqMEHfBopc75\n2YUvaUcHn2iv4sobmitSXEW/+CRa85lw2afA4WVfvAqgoRXMIOlYv8nB5Ctu24UI\nTymgcED9eahKWrkZG+SWk8v7a628t4VIV6MwbUBPWwKBgQC8nGtuFqYrDMywby73\nKqoY/rAsGy0e+vNWrdhNrRKUbTzNs9mSy+bOARiCQw9fACKAh4U3XYXO7E8SSz36\n0exrJzs/V1jDuNSHrSOoVp+fY1BX5rIKkq5EcrNpw6IKOy6RN2/Y9ghAfsHzK831\nGqFctKR1zsICIhr5372+wLL+JwKBgQC7SA3k1AwJfLv4aCfa+Zi2pCrUwGHwI/bV\nsVoT+CGZbTn9o5C1DGuVK5SgTVJ4+aZd9PCBWdOs1NFkuUjJZSxsWMciq6CIuA99\nxJJVfu0GAk+PhOInsBQ0zMMFo4eI4jnKOPz58t0b2RU6LF2MCpJbRoygwnA5+DIi\n39NuPKowBwKBgQCJtAobTh3zwFyRVBuOCXA233vwN8cxnzaaSkJqM7ok87w40t4+\n9u+D5/jk4eEPEyIdhNQWIAnZkV4JlTWjMjDR6squ7C66du90P0yRUu0niXLXOm8y\nmPTytGuZBGQB5EOTck4OsVJFBEbGK20rTk4RSTHpcRLkS9I2LMxzwGzucQKBgCqv\n/8q6souvDMFQLFVzMuXegYzA1RIBgI+wvxFyK2ZnSSKRF7jMvfDgYB4xwaylatBb\ntj4llWP9lkTZHsgY8Yk4qxsx94NyQMWv+pLWPXxzJmNWLJ5TOifWzFUKsyf2OKnp\nV3A5dUCVuIrr9d6nwjhf2koCR8ZO1k6wqeakmT4dAoGATqOkc3tNvyvL3fCUZqW3\nS3L5VPj9uwuPAo4puYx1tzDzddKH0+UuKj9oxW8v3Dcdc0/L0g/8AEBDX9mzTfR/\nSpHRdYDOcDvwPy45++0ZLUsAc5nAftlemIfcEnUp5vKOt/fPp5SjPyO4pbGod96I\nq9a06LJKjcXRZvXclXc4mwU=\n-----END PRIVATE KEY-----\n",
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