import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  // Parse the JSON from the request body
  const { name, current } = await request.json();

  // Query users with a case-insensitive name filter
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: current,
      },
      name: {
        startsWith: name,
        mode: "insensitive",
      },
    },
  });

  return NextResponse.json(users, { status: 200 });
};
