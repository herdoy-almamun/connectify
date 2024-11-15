import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { selectedChat } = await request.json();

    if (!selectedChat) {
      return NextResponse.json(
        { error: "selectedChat is required." },
        { status: 400 }
      );
    }
    const message = await prisma.message.findMany({
      where: { chatId: selectedChat },
    });

    return NextResponse.json(message, { status: 200 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat." },
      { status: 500 }
    );
  }
};
