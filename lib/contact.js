const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactPayload(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || name.length < 2) {
    return { ok: false, error: "Please enter your name." };
  }
  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "Please enter a valid email address." };
  }
  if (!message || message.length < 10) {
    return { ok: false, error: "Please enter a message (at least 10 characters)." };
  }
  if (name.length > 120 || email.length > 254 || message.length > 5000) {
    return { ok: false, error: "Message is too long." };
  }

  return { ok: true, data: { name, email, message } };
}

export function getContactMailConfig() {
  const to = process.env.CONTACT_TO_EMAIL;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!to || !user || !pass) {
    return { ok: false, error: "Email service is not configured on the server." };
  }

  return {
    ok: true,
    config: {
      to,
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true",
      user,
      pass,
      from: process.env.SMTP_FROM || user,
    },
  };
}
