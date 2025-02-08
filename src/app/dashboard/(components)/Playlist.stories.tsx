import React from "react";
import PlayList from "./PlayList";
import DashboardPlaylist from "@/types/dashboard-playlist";

export default {
  title: "dashboard/PlayList",
  component: PlayList,
};

const Template = (args: DashboardPlaylist) => <PlayList {...args} />;

export const Default = Template.bind({});
Default.args = {
  playlist: {
    id: 0,
    name: "Pop & Dance",
    cover:
      "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
    tags: [{ name: "Pop" }, { name: "Dance" }, { name: "Électro" }],
  },
  selected: false,
  repartition: 30,
};

export const Selected = Template.bind({});
Selected.args = {
  playlist: {
    id: 0,
    name: "Pop & Dance",
    cover:
      "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWxidW0lMjBjb3ZlcnxlbnwwfHwwfHx8MA%3D%3D",
    tags: [{ name: "Pop" }, { name: "Dance" }, { name: "Électro" }],
  },
  selected: true,
  repartition: 30,
};
