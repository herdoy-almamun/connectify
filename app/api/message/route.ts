import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { chatId, text, image, sender } = await request.json();

    // Validate required fields
    if (!chatId) {
      return NextResponse.json(
        { error: "chatId is required." },
        { status: 400 }
      );
    }

    if (!text && !image) {
      return NextResponse.json(
        { error: "Either text or image must be provided." },
        { status: 400 }
      );
    }

    // Create message
    const message = await prisma.message.create({
      data: { chatId, text, image, sender },
    });

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: "Failed to create message." },
      { status: 500 }
    );
  }
};
