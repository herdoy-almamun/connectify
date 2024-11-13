import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const storys = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(storys);
};

export const POST = async (request: NextRequest) => {
  const { userId, image, text } = await request.json();
  const story = await prisma.post.create({ data: { userId, image, text } });
  return NextResponse.json(story, { status: 201 });
};
