import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const { userId, postId, comment } = await request.json();
  const newComment = await prisma.comment.create({
    data: { userId, postId, comment },
  });
  return NextResponse.json(newComment, { status: 201 });
};
