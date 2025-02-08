import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs";

const prisma = new PrismaClient();

// Configure multer storage
const songStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/songs";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const songUpload = multer({ storage: songStorage });

// Middleware to handle multipart form data
export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all songs
    const songs = await prisma.song.findMany({
      include: { tags: true },
    });
    return res.status(200).json(songs);
  }

  if (req.method === "POST") {
    // Create a new song
    return new Promise((resolve, reject) => {
      songUpload.single("audio")(req as any, res as any, async (err) => {
        if (err) return res.status(500).json({ error: err });

        const { name, singer, duration } = req.body;
        const path = req.file ? `/songs/${req.file.filename}` : "";

        try {
          const newSong = await prisma.song.create({
            data: { name, singer, duration: Number(duration), path },
          });
          res.status(201).json(newSong);
          resolve("");
        } catch (error) {
          res.status(500).json({ error: error });
          reject(error);
        }
      });
    });
  }

  res.status(405).json({ error: "Method Not Allowed" });
}
