import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export const GET = async (request: NextRequest, { params }: Props) => {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  if (!user) return NextResponse.json("Invalid User", { status: 403 });
  return NextResponse.json(user, { status: 200 });
};
