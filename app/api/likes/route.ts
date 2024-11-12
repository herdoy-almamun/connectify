import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userId, postId } = await request.json();
  const isLiked = await prisma.like.findFirst({ where: { userId, postId } });

  if (isLiked) {
    await prisma.like.delete({ where: { id: isLiked.id } });
  } else {
    await prisma.like.create({ data: { postId, userId } });
  }

  return NextResponse.json(isLiked ? "OK" : "Like created", {
    status: isLiked ? 200 : 201,
  });
};
