import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (request: NextRequest, { params }: Props) => {
  try {
    // Validate params.id
    if (!params.id) {
      return NextResponse.json(
        { error: "User ID is required." },
        { status: 400 }
      );
    }

    // Fetch chats where the user is included
    const chats = await prisma.chat.findMany({
      where: {
        users: {
          hasEvery: [params.id],
        },
      },
    });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to find chats." },
      { status: 500 }
    );
  }
};
