import React from "react";
import Song from "./Song";

export default {
  title: "dashboard/new-playlist/Song",
  component: Song,
};

const Template = (args) => <Song {...args} />;

export const Default = Template.bind({});
Default.args = {
  song: {
    id: 3,
    name: "Stay with me",
    singer: "Sam Smith",
    duration: 114,
    favorite: true,
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
  added: false,
};
