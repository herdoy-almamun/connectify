import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const comments = await prisma.comment.findMany({
    where: { postId: params.id },
  });
  return NextResponse.json(comments, { status: 200 });
};
