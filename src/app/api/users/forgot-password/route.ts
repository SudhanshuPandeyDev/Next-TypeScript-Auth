// This code sends a reset password email to Mailtrap

import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  const reqBody = await request.json();
  const { email } = reqBody;

  if (!email) {
    return NextResponse.json({ error: "Email is Required" }, { status: 400 });
  }

  const resetToken = await bcryptjs.hash(email.toString(), 8);

  // Configure Nodemailer (example using Mailtrap)
  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const resetLink = `${process.env.domain}/reset-password?token=${resetToken}&email=${email}`;

  try {
    await transport.sendMail({
      from: "sudhanshu734999@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p> ${resetLink}`,
    });
  } catch (error) {
    console.log(error);
  }
}
