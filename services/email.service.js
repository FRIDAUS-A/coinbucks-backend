require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const nodemailer = require('nodemailer');

const sendEmail = async (email, otp) => {
    try {
        const transporter = nodemailer.createTransport({
        // service: 'Gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465
        auth: {
            user: process.env.COINBUCKS_EMAIL,
            pass: process.env.COINBUCKS_KEY,
        },
        });

        const mailOptions = {
            from: process.env.COINBUCKS_EMAIL,
            to: email,
            subject: "Hello from COINBUCKS",
            text: `Your OTP is ${otp}`,
        };

        console.log('Sending email...');
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: ", info.response);
        return "success";
    } catch (error) {
        console.log("Error sending email: ", error);
        return "failed";
    }
};

const sendErrorEmail = async (message) => {
  try {
    const transporter = nodemailer.createTransport({
    // service: 'Gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465
    auth: {
        user: process.env.COINBUCKS_EMAIL,
        pass: process.env.COINBUCKS_KEY,
    },
    });

    const mailOptions = {
        from: process.env.COINBUCKS_EMAIL,
        to: process.env.DEVELOPER_EMAIL,
        subject: "Error on COINBUCKS server",
        text: `${message}`,
    };

    console.log('Sending email...');
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return "success";
    } catch (error) {
        console.log("Error sending email: ", error);
        return "failed";
    }
};



module.exports = { 
  sendEmail,
  sendErrorEmail,
 };