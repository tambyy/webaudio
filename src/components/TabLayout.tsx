"use client";

import { ReactNode, useEffect, useState } from "react";

function Tabs<T>({
  tabs,
  render,
  onChange,
}: {
  tabs: T[];
  render: (tab: T, selected: boolean) => ReactNode;
  onChange?: (i: number) => void;
}) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (onChange) onChange(selected);
  }, [onChange, selected]);

  return (
    <div className="w-full flex flex-row">
      {tabs.map((tab, i) => (
        <div className="cursor-pointer" key={i} onClick={() => setSelected(i)}>
          {render(tab, i == selected)}
        </div>
      ))}
    </div>
  );
}

export default Tabs;
