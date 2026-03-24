import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory store for dashboard reference
const feedbackStore: any[] = [];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, category, rating, message } = body;

    if (!name || !message || !category) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const entry = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email?.trim() || "Anonymous",
      category,
      rating: Number(rating) || 5,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    feedbackStore.push(entry);

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "manjunathb1011@gmail.com",
        pass: process.env.EMAIL_PASSWORD, // Must be an App Password, not regular password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"CareerAI Feedback" <manjunathb1011@gmail.com>`,
      to: "manjunathb1011@gmail.com",
      subject: `New Feedback: ${category} (${rating}/5 Stars)`,
      html: `
        <h2>New Feedback Received</h2>
        <p><strong>Name:</strong> ${entry.name}</p>
        <p><strong>Email:</strong> ${entry.email}</p>
        <p><strong>Category:</strong> ${entry.category}</p>
        <p><strong>Rating:</strong> ${entry.rating} / 5</p>
        <p><strong>Message:</strong></p>
        <blockquote style="border-left: 4px solid #ccc; padding-left: 10px;">
          ${entry.message}
        </blockquote>
      `,
    });

    return NextResponse.json({ success: true, id: entry.id }, { status: 201 });
  } catch (error) {
    console.error("Failed to send feedback email:", error);
    return NextResponse.json({ error: "Failed to submit feedback" }, { status: 500 });
  }
}

export async function GET() {
  const sorted = [...feedbackStore].reverse();
  return NextResponse.json({ feedback: sorted, total: sorted.length });
}
