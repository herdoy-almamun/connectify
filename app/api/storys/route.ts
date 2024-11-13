import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);
  const storys = await prisma.story.findMany({
    where: {
      createdAt: {
        gte: startOfToday,
      },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(storys);
};

export const POST = async (request: NextRequest) => {
  const { userId, image } = await request.json();
  const story = await prisma.story.create({ data: { userId, image } });
  return NextResponse.json(story, { status: 201 });
};
