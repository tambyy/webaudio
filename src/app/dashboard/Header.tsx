import useSlideStore from "@/store/slideStore";

const Header = ({ onFilterChanged }) => {
  const openSlide = useSlideStore((state) => state.open);

  return (
    <div className="w-full h-auto flex flex-row gap-3 items-center">
      {/* Title */}
      <div className="flex flex-col flex-1">
        <h2 className="text-base font-medium text-gray-500 mt-0 mb-0">
          Playlist par défaut
        </h2>
        <p className="text-xs font-medium mb-2 text-gray-400">
          Il en faut pour tous les goût
        </p>
      </div>

      {/* New Playlist */}
      <a
        className="text-sm font-medium text-white bg-cyan-500 h-8 flex flex-row items-center px-3 rounded shadow-lg cursor-pointer"
        onClick={() => openSlide("new-playlist")}
      >
        + Créer une playlist
      </a>

      {/* Search */}
      <div className="text-sm font-medium text-gray-400 h-8 flex flex-row rounded border border-gray-300">
        <div className="w-9 h-full flex items-center justify-center border-r border-gray-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#333"
          >
            <path d="M762.69-160.92 524.46-399.16q-30 22.77-65.79 35.27-35.79 12.5-73.87 12.5-93.58 0-159.11-65.51-65.53-65.51-65.53-159.04 0-93.52 65.51-159.1 65.51-65.57 159.04-65.57 93.52 0 159.1 65.53 65.57 65.53 65.57 159.11 0 39.23-12.88 75.02-12.89 35.8-34.89 64.64l238.23 238.23-37.15 37.16ZM384.77-403.38q72.31 0 122.46-50.16 50.16-50.15 50.16-122.46t-50.16-122.46q-50.15-50.16-122.46-50.16t-122.46 50.16Q212.15-648.31 212.15-576t50.16 122.46q50.15 50.16 122.46 50.16Z" />
          </svg>
        </div>
        <input
          className="w-52 h-full bg-transparent px-3"
          placeholder="Rechercher un genre musical"
          onChange={(e) => onFilterChanged(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Header;
