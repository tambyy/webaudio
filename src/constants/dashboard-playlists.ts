import DashboardPlaylist from "@/types/dashboard-playlist";

const dashboardPlaylists: DashboardPlaylist[] = [
  {
    playlist: {
      id: 0,
      name: "Pop & Dance",
      color: "#ff6b6b",
      cover:
        "https://plus.unsplash.com/premium_photo-1721310985165-4e6e63d5e7a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: false,
    repartition: 30,
  },
  {
    playlist: {
      id: 1,
      name: "RAP & RNB",
      color: "#ff6b6b",
      cover:
        "https://plus.unsplash.com/premium_photo-1682125488670-29e72e5a7672?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: true,
    repartition: 30,
  },
  {
    playlist: {
      id: 2,
      name: "Rock",
      color: "#4ecdc4",
      cover:
        "https://images.unsplash.com/photo-1515191107209-c28698631303?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: true,
    repartition: 55,
  },
  {
    playlist: {
      id: 3,
      name: "Variétés",
      color: "#ff6b6b",
      cover:
        "https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFsYnVtJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: false,
    repartition: 30,
  },
  {
    playlist: {
      id: 4,
      name: "Jazz & Soul",
      color: "#1a535c",
      cover:
        "https://images.unsplash.com/photo-1535083252457-6080fe29be45?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGFsYnVtJTIwY292ZXJ8ZW58MHx8MHx8fDA%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: true,
    repartition: 15,
  },
  {
    playlist: {
      id: 5,
      name: "World Music",
      color: "#ff6b6b",
      cover:
        "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
      tags: [
        { id: 0, name: "Pop" },
        { id: 1, name: "Dance" },
        { id: 2, name: "Électro" },
      ],
    },
    selected: false,
    repartition: 30,
  },
];

export default dashboardPlaylists;
