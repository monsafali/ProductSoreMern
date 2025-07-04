import nodemailer from "nodemailer";

export const sendMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // e.g. smtp.gmail.com or smtp.mailtrap.io
      port: Number(process.env.SMTP_PORT), // e.g. 465 for secure or 587 for TLS
      secure: process.env.SMTP_SECURE === "true", // true for 465, false for 587
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: `"From: " <${process.env.SMTP_USER}>`,
      to,
      subject,
      text,
    });

    console.log("✅ Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ SMTP Mail error:", error.message);
    throw error;
  }
};
