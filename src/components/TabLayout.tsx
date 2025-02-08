"use client";

import { ReactNode } from "react";

interface Tab {
  id: string;
  content: ReactNode;
}

function TabLayout({ tab, tabs }: { tab: number; tabs: Tab[] }) {
  return (
    <div className="w-full h-full overflow-hidden flex flex-col">
      <div
        style={{
          fontSize: 0,
          width: 100 * tabs.length + "%",
          marginLeft: -100 * tab + "%",
        }}
        className="overflow-hidden w-auto h-full whitespace-nowrap max-h-full duration-100 ease-in-out flex flex-row"
      >
        {tabs.map((tab: Tab) => (
          <div
            key={tab.id}
            style={{ width: 100 / tabs.length + "%" }}
            className="flex-1 text-sm inline-block max-h-full overflow-hidden whitespace-normal"
          >
            <div className="w-full h-full align-top">{tab.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TabLayout;
