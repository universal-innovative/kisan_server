const Message = require("../models/message");

const twilio = require("twilio");

//twilio requirements -- Texting API
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);
let otp = "";
var str = "01234567890123456789";
otp = "";
var len = str.length;
for (let i = 0; i < 6; i++) {
  otp += str[Math.floor(Math.random() * len)];
}
exports.send = async (req, res) => {
  console.log(req.body);
  res.set("Access-Control-Allow-Origin", "*");
  const { name, recipient } = req.body;
  try {
    const resp = await client.messages.create({
      body: `Hi ${name}. Your otp is ${otp}`,
      to: recipient, // Text this number
      from: "+12342222845", // From a valid Twilio number
    });
    if (resp) {
      console.log(resp);
      const messageObj = {
        message: resp.body.split("- ")[1],
        phone: resp.to,
        name,
        otp,
      };
      const message = await new Message(messageObj).save();
      res.json(message);
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
  //_GET Variables

  //Send Text
};

exports.list = async (req, res) => {
  res.json(await Message.find({}).sort({ createdAt: -1 }).exec());
};
/**{
  body: 'Sent from your Twilio trial account - Hi Kumar Abhimanyu. Your otp is 511155',
  numSegments: '1',
  direction: 'outbound-api',
  from: '+12342222845',
  to: '+917635047441',
  dateUpdated: 2023-02-11T17:49:02.000Z,
  price: null,
  errorMessage: null,
  uri: '/2010-04-01/Accounts/AC8abe69d5f635b2328243cb014ffdbc19/Messages/SM44f1c6d39ceec2ed7542e54ed77c9454.json',
  accountSid: 'AC8abe69d5f635b2328243cb014ffdbc19',
  numMedia: '0',
  status: 'queued',
  messagingServiceSid: null,
  sid: 'SM44f1c6d39ceec2ed7542e54ed77c9454',
  dateSent: null,
  dateCreated: 2023-02-11T17:49:02.000Z,
  errorCode: null,
  priceUnit: 'USD',
  apiVersion: '2010-04-01',
  subresourceUris: {
    media: '/2010-04-01/Accounts/AC8abe69d5f635b2328243cb014ffdbc19/Messages/SM44f1c6d39ceec2ed7542e54ed77c9454/Media.json'
  }
} */
