const express = require('express')
const app = express()
app.use(express.json())
require("dotenv").config()
const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send("Server")
})

app.post('/email', (req, res) => {
    var nodemailer = require('nodemailer');

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: 'nguyendocuongbka@gmail.com',
        to: 'nguyendocuongbka@gmail.com',
        subject: 'THÔNG TIN ĐƠN HÀNG',
        text: JSON.stringify(req.body)
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return res.status(500).json({ error: "Error server" })
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

    res.status(200).json({ success: true })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => console.log("Server started by port " + PORT))