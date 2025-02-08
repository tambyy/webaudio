import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import multer from "multer";
import fs from "fs";

const prisma = new PrismaClient();

// Configure multer storage
const coverStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "public/covers";
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const coverUpload = multer({ storage: coverStorage });

// Middleware to handle multipart form data
export const config = { api: { bodyParser: false } };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // Fetch all playlists
    const playlists = await prisma.playlist.findMany({
      include: {
        songs: {
          include: {
            tags: true,
          },
        },
        tags: true,
      },
    });
    return res.status(200).json(playlists);
  }

  if (req.method === "POST") {
    // Create a new playlist
    return new Promise((resolve, reject) => {
      coverUpload.single("cover")(req as any, res as any, async (err) => {
        if (err) return res.status(500).json({ error: err });

        const { name, color, songs } = req.body;
        const cover = req.file ? `/covers/${req.file.filename}` : "";

        try {
          // Create new playlist
          const newPlaylist = await prisma.playlist.create({
            data: { name, color, cover },
          });

          console.log(newPlaylist);

          // Attach selected songs to the new playlist
          const updatedPlaylist = await prisma.playlist.update({
            where: { id: Number(newPlaylist.id) },
            data: {
              songs: {
                connect: songs.map((songId) => ({ id: Number(songId) })),
              },
            },
            include: { songs: true },
          });

          res.status(201).json(updatedPlaylist);
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
