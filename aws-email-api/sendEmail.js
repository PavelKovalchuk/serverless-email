'use strict';

const AWS = require("aws-sdk");
// simple email service
const ses = new AWS.SES();

const _400 = (body) => {
  return {
    statusCode: 400,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(body, null, 2),
  };
};

const _200 = () => {
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    body: "success",
  };
};

module.exports.handler = async (event) => {
  const {from, to, subject, text} = JSON.parse(event.body);

  if(!from || !to || !subject || !text) {
    return _400({message: "Missing parameter on request body"});
  }

  const emailParams = {
    Destination: {
      ToAddresses: [to]
    },
    Message: {
      Body: {
        Text: {Data: text}
      },
      Subject: {
        Data: subject,
      },
    },
    Source: from,
  };

  try {
    await ses.sendEmail(emailParams).promise();
    return _200();
  } catch(error) {
    console.error("Error in sending email: ", error);
    return _400({message: "Unable to send an email." + error});
  }
};

