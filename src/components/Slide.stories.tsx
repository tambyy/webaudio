import React from "react";
import Slide from "./Slide";

export default {
  title: "components/Slide",
  component: Slide,
};

const Template = (args) => <Slide {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: "Créer une Playlist",
  children: <div>Bonjour</div>,
};
