import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all tags
    const tags = await prisma.tag.findMany({});
    return res.status(200).json(tags);
  }

  if (req.method === "POST") {
    // Add new tag
    const { name, color, bgcolor } = req.body;

    if (!name || !color || !bgcolor) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTag = await prisma.tag.create({
      data: { name, color, bgcolor },
    });

    return res.status(201).json(newTag);
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
