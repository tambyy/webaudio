import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    // Update song
    try {
      const { id } = req.query;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const { name, singer, tags } = req.body;

      const updateData: Record<string, any> = {};
      if (name) updateData.name = name;
      if (singer) updateData.singer = singer;

      let updatedSong = await prisma.song.update({
        where: { id: Number(id) },
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
      res.status(500).json({ error: "Error updating song" });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
