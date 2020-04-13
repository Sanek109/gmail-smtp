const express = require('express');
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser  = require('body-parser');
const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alexreactredux@gmail.com', // generated ethereal user
        pass: '8403052z' // generated ethereal password
    }
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.post('/sendMessage', async function (req, res) {

    let {formMessage, formContacts, formName} = req.body;
    let info = await transporter.sendMail({
        from: "HR WANTS ME", // sender address
        to: "audiquattro66077@gmail.com", // list of receivers
        subject: "Text gmail", // Subject line
        // text: "Text send message", // plain text body
        html:  `<b>Привет, сообщение с вашего портфолио</b>
        <div>
        Name HR: ${formName}
</div>
<div>
Contacts email: ${formContacts}
</div>
<div>Message: ${formMessage}</div>`

    });
    res.send('Ok');
});

app.listen(PORT, function () {
    console.log('Example app listening on port 3010!');
});
