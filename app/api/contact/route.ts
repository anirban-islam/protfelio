// src/app/api/contact/route.ts

import { connectDB } from "@/lib/mongodb";
import Contact from "@/models/Contact";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address" },
        { status: 400 }
      );
    }

    // Create and save contact
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone?.trim() || "",
      subject: subject?.trim() || "General Inquiry",
      message: message.trim(),
      status: "new",
      isRead: false,
    });

    console.log("✅ Contact message created:", contact._id);

    return NextResponse.json(
      {
        message: "Your message has been sent successfully!",
        id: contact._id,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("❌ Contact form error:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .select("name email subject message status isRead createdAt");

    const unreadCount = contacts.filter((c) => !c.isRead).length;

    return NextResponse.json({
      contacts,
      total: contacts.length,
      unread: unreadCount,
    });
  } catch (error) {
    console.error("❌ Error fetching contacts:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact messages." },
      { status: 500 }
    );
  }
}
