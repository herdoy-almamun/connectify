import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  const storys = await prisma.story.findMany();
  return NextResponse.json(storys);
};

export const POST = async (request: NextRequest) => {
  const { userId, image } = await request.json();
  const story = await prisma.story.create({ data: { userId, image } });
  return NextResponse.json(story, { status: 201 });
};