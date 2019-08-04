module.exports = {
    makeJSON: (body) => {
        // console.log(body)
        v1JSON.result.fulfillment.messages = [];
        return new Promise ((resolve) => {
            var ts = new Date()
            v1JSON.id = body.responseId;
            v1JSON.lang = body.languageCode;
            v1JSON.timestamp = ts.toJSON();
            v1JSON.result.resolvedQuery = body.queryResult.queryText;
            v1JSON.action = body.queryResult.action;
            v1JSON.result.score = body.queryResult.intentDetectionConfidence;
            v1JSON.result.parameters = body.queryResult.parameters;
            // v1JSON.result.metadata.intentId = body.queryResult.intent.name.split('/')[name.split('/').length - 1];
            // v1JSON.result.metadata.intentName = body.queryResult.intent.name;

            // console.log(body.queryResult.fulfillmentMessages.length);
            // console.log("@@#$#@$#@$55555555555555555555");
    
            for (var i = 0; i < body.queryResult.fulfillmentMessages.length; i++) {
                console.log(body.queryResult.fulfillmentMessages[i]);
                console.log("@#@#@#@#@#");
                if (body.queryResult.fulfillmentMessages[i].hasOwnProperty("card")) {
                    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    v1JSON.result.fulfillment.messages.push({
                        lang : 'en',
                        type : 1,
                        platform: 'facebook',
                        imageUrl: body.queryResult.fulfillmentMessages[i].card.imageUri,
                        buttons: body.queryResult.fulfillmentMessages[i].card.buttons,
                        subtitle: body.queryResult.fulfillmentMessages[i].card.subtitle,
                        title: body.queryResult.fulfillmentMessages[i].card.title
                    })
                    // (body.queryResult.fulfillmentMessages.card);
                    // v1JSON.result.fulfillment.messages[i].lang = 'en';
                    // v1JSON.result.fulfillment.messages[i].type = 1;
                    // v1JSON.result.fulfillment.messages[i].platform = 'facebook';
                }
                if (body.queryResult.fulfillmentMessages[i].hasOwnProperty("text")) {
                    console.log("DDDDDDDDDDDDDDDDDD");
                    v1JSON.result.fulfillment.messages.push({
                        lang : 'en',
                        type : 0,
                        platform: 'facebook',
                        speech: body.queryResult.fulfillmentText
                    })
                    
                }
                
                if (body.queryResult.fulfillmentMessages[i].hasOwnProperty("payload")) {
                    console.log(body.queryResult.fulfillmentMessages[i].payload);
                    console.log("^^^^^^^^^^^^^^^^^^");
                    v1JSON.result.fulfillment.messages.push({
                        lang : 'en',
                        type : 4,
                        platform: 'facebook',
                        payload: body.queryResult.fulfillmentMessages[i].payload
                    })
                    
                }

                if (i == body.queryResult.fulfillmentMessages.length - 1) {
                    console.log("WWWWWWWWWWWWWWWWW");
                    resolve(v1JSON)
                }
            } 
        })
    }
}


var v1JSON = {
    "id":"44bdcbd8-b762-4394-bf93-50bf0f5c3e39-21947381",
    "lang":"en",
    "sessionId":"session",
    "timestamp":"2019-08-04T13:53:13.726Z",
    "result":{
       "source":"agent",
       "resolvedQuery":"carousel",
       "action":"carousel",
       "actionIncomplete":false,
       "score":1,
       "parameters":{
 
       },
       "contexts":[
 
       ],
       "metadata":{
          "intentId":"b0a848b6-693d-4478-927b-e5a656848ef4",
          "webhookResponseTime":33,
          "intentName":"carousel response",
          "webhookUsed":"true",
          "webhookForSlotFillingUsed":"false",
          "isFallbackIntent":"false"
       },
       "fulfillment":{
          "speech":"",
          "messages":[]
       }
    },
    "status":{
       "code":206,
       "errorType":"partial_content",
       "errorDetails":"Webhook call failed. Error: 404 Not Found."
    }
 }

 var v1JSON2 = {
    "id":"558d7b5f-49c7-4b27-b028-dc57c628335b-21947381",
    "lang":"en",
    "sessionId":"session",
    "timestamp":"2019-08-04T13:52:49.941Z",
    "result":{
       "source":"agent",
       "resolvedQuery":"hi",
       "action":"input.welcome",
       "actionIncomplete":false,
       "score":1,
       "parameters":{
 
       },
       "contexts":[
 
       ],
       "metadata":{
          "intentId":"148e427a-10ce-40e3-9ea6-7c2944a03074",
          "webhookResponseTime":34,
          "intentName":"Default Welcome Intent",
          "webhookUsed":"true",
          "webhookForSlotFillingUsed":"false",
          "isFallbackIntent":"false"
       },
       "fulfillment":{
          "speech":"",
          "messages":[
             {
                "platform":"facebook",
                "lang":"en",
                "type":0,
                "speech":"hello this is a simple response"
             }
          ]
       }
    },
    "status":{
       "code":206,
       "errorType":"partial_content",
       "errorDetails":"Webhook call failed. Error: 404 Not Found."
    }
 }