import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const likes = await prisma.like.findMany({ where: { postId: params.id } });
  return NextResponse.json(likes, { status: 200 });
};
