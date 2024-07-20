const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const emailService = {
  sendEmail: async (email, subject, content, style) => {
    try {
      const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    ${commonStyle}
                    ${style} 
                </style>
            </head>
            <body>
                ${content}
            </body>
            </html>
        `;
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        html: html,
      };
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  },

  sendOtp: async (user, otp, branding) => {
    const subject = "Login OTP Code";
    const content = `
        <div class="email-wrapper">
            <div class="email-header">
                <img src="${branding.logo.base64String}" alt="Company Logo">
                <h1 style="margin-top: 10px;">${branding.title}</h1>
            </div>
            <div class="email-body">
                <p>Dear ${user.name} ${user.surname},</p>
                <p>Thank you for using our service. Please use the following One-Time Password (OTP) to complete your verification:</p>
                <div class="otp-code">${otp}</div>
                <p>If you did not request this OTP, please ignore this email.</p>
                <p>Best regards,<br>${branding.title} Team</p>
            </div>
            <div class="email-footer">
                <p>&copy; ${new Date().getFullYear()} ${branding.title}. All rights reserved.</p>
            </div>
        </div>
    `;
    await emailService.sendEmail(user.email, subject, content, otpStyle);
  },


  updatePassword: async (email, password) => {
    const verificationLink = `${process.env.FRONTEND_URL}/`;
    const subject = "Password Reset Request";
    const content = `
      <h1>Password Reset</h1>
      <p>We received a request to reset your password. Click the link below to reset your password: ${password}</p>
      <a href="${verificationLink}">Check Password</a>
    `;

    await emailService.sendEmail(email, subject, content);
  },

  sendEmailVerification: async (email, verificationToken) => {
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    const subject = "Email Verification";
    const content = `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your new email address:</p>
      <a href="${verificationLink}">Verify Email</a>
    `;
    await emailService.sendEmail(email, subject, content);
  },
};

module.exports = emailService;

const commonStyle = `
body, html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  line-height: 1.6;
  font-size: 16px;
  background-color: #f4f4f4;
}
.email-footer {
  text-align: center;
  margin-top: 20px;
  color: #777777;
}
.email-footer p {
  font-size: 14px;
  margin: 8px 0;
}
.email-wrapper {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.email-header {
  text-align: center;
  margin-bottom: 20px;
}
.email-header img {
  max-width: 150px;
  height: auto;
}
.email-header h1 {
  font-size: 24px;
  margin: 10px 0;
  color: #333333;
}
.email-body {
  text-align: center;
}
`;
const otpStyle = `
.otp-code {
  font-size: 36px;
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 15px 20px;
  border-radius: 6px;
  display: inline-block;
  margin: 20px 0;
}
`;
