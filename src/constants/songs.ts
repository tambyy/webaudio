import Song from "@/types/song";

const songs: Song[] = [
  {
    id: 0,
    name: "Shape of you",
    singer: "Ed Sheeran",
    duration: 234,
    favorite: true,
    tags: [
      {
        id: 0,
        name: "Pop",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
      {
        id: 1,
        name: "Hit",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
      {
        id: 2,
        name: "Eté",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
    ],
  },
  {
    id: 1,
    name: "Blinding Lights",
    singer: "The Weeknd",
    duration: 200,
    favorite: true,
    tags: [
      {
        id: 0,
        name: "Pop",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
      {
        id: 4,
        name: "Dance",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
    ],
  },
  {
    id: 2,
    name: "Bad guy",
    singer: "Billie Eilish",
    duration: 194,
    favorite: false,
    tags: [
      {
        id: 5,
        name: "Altrnatif",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
      {
        id: 4,
        name: "Dance",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
    ],
  },
  {
    id: 3,
    name: "Stay with me",
    singer: "Ed Sheeran",
    duration: 114,
    favorite: false,
    tags: [
      {
        id: 0,
        name: "Pop",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
      {
        id: 6,
        name: "Soul",
        color: "#0099AA",
        bgcolor: "#DDEEFF",
      },
    ],
  },
];

export default songs;
