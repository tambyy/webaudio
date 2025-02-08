import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // Update song
    const { id, name, singer, tags } = req.body;

    console.log(req.body);

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    try {
      const updateData: Record<string, any> = {};
      if (name) updateData.name = name;
      if (singer) updateData.singer = singer;

      let updatedSong = await prisma.song.update({
        where: { id },
        data: updateData, // Only includes filled fields
      });

      updatedSong = await prisma.song.update({
        where: { id: Number(id) },
        data: {
          tags: {
            connect: tags.map((tagId: number) => ({ id: Number(tagId) })),
          },
        },
        include: { tags: true },
      });

      res.status(200).json(updatedSong);
    } catch (error) {
      console.error("Update failed:", error);
      res.status(500).json({ error: "Error updating user" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
