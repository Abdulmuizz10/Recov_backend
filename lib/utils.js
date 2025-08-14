import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const sendPostConfirmationEmail = async (
  email,
  firstName,
  lastName,
  postId
) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Post Confirmation",
    html: `
      <h1>Order Confirmation</h1>
      <p>Dear ${firstName} ${lastName},</p>
      <p>We've received your post. Here are the details:</p>
      <li><strong>Post ID:</strong> ${postId}</li>
      <p>We will notify you once your item has been found.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error("Failed to send confirmation email " + error.message);
  }
};

export const sendResetEmailLink = async ({ email, subject, message }) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text: message,
  };

  await transporter.sendMail(mailOptions);
};

export const sendWelcomeEmail = async (email, firstName, action) => {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const subject =
    action === "signup"
      ? "Welcome to Recov - Start Shopping Today!"
      : "Welcome Back to Recov!";

  const html =
    action === "signup"
      ? `<h1>Welcome to , ${firstName}!</h1>
         <p>We're thrilled to have you join our community of modest shoppers.</p>
         <p>Explore exclusive deals and discounts today.</p>
         <p><a href="Recov-abdulmuizz10s-projects.vercel.app/collections/shop_all" style="color: #04BB6E; font-weight: bold;">Shop Now</a></p>`
      : `<h1>Welcome back to Recov, ${firstName}!</h1>
         <p>We're excited to see you shopping with us again.</p>
         <p>Discover our latest collections and discounts today.</p>
         <p><a href="Recov-abdulmuizz10s-projects.vercel.app/collections/shop_all" style="color: #04BB6E; font-weight: bold;">Shop Now</a></p>`;

  await transporter.sendMail({
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
  });
};
