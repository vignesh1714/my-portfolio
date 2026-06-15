import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { getContactMailConfig, parseContactPayload } from "@/lib/contact";

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = parseContactPayload(body);

    if (!parsed.ok) {
      return NextResponse.json({ error: parsed.error }, { status: 400 });
    }

    const mailConfig = getContactMailConfig();
    if (!mailConfig.ok) {
      return NextResponse.json({ error: mailConfig.error }, { status: 503 });
    }

    const { name, email, message } = parsed.data;
    const { to, host, port, secure, user, pass, from } = mailConfig.config;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from,
      to,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
      html: `
        <h2>New portfolio message</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again or email directly." },
      { status: 500 }
    );
  }
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
