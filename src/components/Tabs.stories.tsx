import React from "react";
import Tabs from "./Tabs";

export default {
  title: "components/Tabs",
  component: Tabs,
};

const Template = (args) => <Tabs {...args} />;

export const Default = Template.bind({});
Default.args = {
  tabs: ["Bibiothèque", "Mes fichiers"],
  render: (tab: string, selected: boolean) => (
    <div
      className={`h-9 flex items-center justify-center px-3 border-b-2 text-purple-800 ${
        selected ? "border-cyan-500" : "border-transparent"
      }`}
    >
      {tab}
    </div>
  ),
};
