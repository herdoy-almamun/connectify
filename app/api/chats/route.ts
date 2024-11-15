import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { createrId, friendId } = await request.json();

    if (!createrId || !friendId) {
      return NextResponse.json(
        { error: "createrId and friendId are required." },
        { status: 400 }
      );
    }

    // Check if a chat already exists between createrId and friendId
    const existingChat = await prisma.chat.findFirst({
      where: {
        users: {
          hasEvery: [createrId, friendId],
        },
      },
    });

    if (existingChat) {
      return NextResponse.json(existingChat, { status: 200 });
    }

    // Create a new chat if one doesn't exist
    const chat = await prisma.chat.create({
      data: {
        users: [createrId, friendId],
      },
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat." },
      { status: 500 }
    );
  }
};
