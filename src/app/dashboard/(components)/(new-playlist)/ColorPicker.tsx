import { useState } from "react";

const ColorPicker = ({
  title,
  colors,
  onChange,
}: {
  title: string;
  colors?: string[];
  onChange: (e: string) => void;
}) => {
  /**
   * Selected color
   */
  const [color, setColor] = useState("#777777");

  /**
   * Color picker choice is open
   */
  const [open, setOpen] = useState(false);

  /**
   * List of colors
   */
  const colorChoices = colors
    ? colors
    : [
        "#f88c7e",
        "#44b8cf",
        "#9fc6b6",
        "#f9d348",
        "#f7a399",
        "#ad9ef3",
        "#fb8dc4",
        "#6fc88c",
        "#4591e1",
        "#f89679",
        "#a06bdf",
        "#678d50",
        "#f9bc48",
        "#f4cc73",
        "#9dbb5c",
        "#c8502c",
        "#1e4471",
      ];

  const handleColorSelected = (
    color: string,
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setOpen(false);
    setColor(color);
    onChange(color);
  };

  return (
    <div
      onClick={() => setOpen(true)}
      className={`relative w-auto pr-3 h-8 bg-white border shadow-sm rounded flex flex-row items-center text-gray-400 cursor-pointer ${
        open ? "border-cyan-400 shadow-cyan-500" : "border-gray-200"
      }`}
    >
      {/* Icon */}
      <div className="w-8 h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill={color}
        >
          <path d="M480-96q-78.72 0-148.8-30.24-70.08-30.24-122.4-82.56-52.32-52.32-82.56-122.4Q96-401.28 96-480q0-80 30.5-149.5t84-122Q264-804 335.5-834t152.75-30q77.39 0 146.07 27Q703-810 754-763t80.5 110Q864-590 864-518q0 96-67.08 163-67.09 67-162.92 67h-67.76q-8.24 0-14.24 5t-6 12.67Q546-255 561-245q15 10 15 53 0 37-27 66.5T480-96ZM264-444q25 0 42.5-17.5T324-504q0-25-17.5-42.5T264-564q-25 0-42.5 17.5T204-504q0 25 17.5 42.5T264-444Zm120-144q25 0 42.5-17.5T444-648q0-25-17.5-42.5T384-708q-25 0-42.5 17.5T324-648q0 25 17.5 42.5T384-588Zm192 0q25 0 42.5-17.5T636-648q0-25-17.5-42.5T576-708q-25 0-42.5 17.5T516-648q0 25 17.5 42.5T576-588Zm120 144q25 0 42.5-17.5T756-504q0-25-17.5-42.5T696-564q-25 0-42.5 17.5T636-504q0 25 17.5 42.5T696-444Z" />
        </svg>
      </div>

      {title}

      {/* Invisible overlay */}
      {open && (
        <div
          className="fixed top-0 left-0 w-full h-full"
          onClick={(e) => {
            setOpen(false);
            e.stopPropagation();
          }}
        ></div>
      )}

      {/* List of colors */}
      <div
        className={`absolute w-52 bg-white p-2 rounded shadow-md border border-gray-200 top-8 left-0 grid grid-cols-5 gap-1 origin-top duration-100 ease-in-out ${
          open
            ? "visible scale-100 opacity-100"
            : "invisible scale-90 opacity-0"
        }`}
      >
        {colorChoices.map((color) => (
          <div
            key={color}
            className="w-8 h-8 rounded cursor-pointer"
            style={{ backgroundColor: color }}
            onClick={(e) => handleColorSelected(color, e)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
