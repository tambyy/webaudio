import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      if (!id || isNaN(Number(id))) {
        return res.status(400).json({ error: "Invalid ID" });
      }

      const deletedItem = await prisma.tag.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Tag deleted", deletedItem });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error deleting tag", details: error });
    }
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
