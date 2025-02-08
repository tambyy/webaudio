import DashboardPlaylist from "@/types/dashboard-playlist";
import ChartPieSlice from "./(components)/ChartPieSlice";
import ChartPieLabel from "./(components)/ChartPieLabel";

const Chart = ({ playlists }: { playlists: DashboardPlaylist[] }) => {
  const total = playlists.reduce(
    (carry, playlist) => carry + playlist.repartition,
    0
  );
  return (
    <form className="w-80 flex flex-col">
      <div className="w-full h-auto flex flex-col bg-white shadow-lg p-4">
        {/* Title */}
        <h2 className="text-base font-medium text-gray-600 mt-0 mb-0">
          Répartition musicale
        </h2>

        {/* Chart */}
        <div className="w-full flex items-center justify-center py-14">
          <svg
            style={{ width: "200px", height: "200px", borderRadius: "50%" }}
            viewBox="0 0 32 32"
          >
            <circle cx="16" cy="16" r="9" fill="#333333" />
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle
                key={i}
                cx="16"
                cy="16"
                r={2.9 + 0.85 * i}
                stroke="#b8a13e55"
                strokeWidth="0.1"
                fill="none"
              ></circle>
            ))}
            <circle cx="16" cy="16" r="2.5" fill="#b8a13e" />
            <circle
              cx="16"
              cy="16"
              r="2"
              stroke="#333333"
              strokeWidth="0.1"
              fill="none"
            ></circle>
            <circle cx="16" cy="16" r="1" fill="#333333" />

            {playlists.map((selectedPlaylist, i) => (
              <ChartPieSlice
                key={selectedPlaylist.playlist.id}
                playlist={selectedPlaylist}
                dashoffset={
                  -playlists
                    .filter((sp, j) => j < i)
                    .reduce(
                      (carry: number, sp: DashboardPlaylist) =>
                        carry + sp.repartition,
                      0
                    )
                }
              />
            ))}
          </svg>
        </div>

        {/* Labels */}
        <div className="w-full flex flex-col px-7">
          {playlists.map((selectedPlaylist, i) => (
            <ChartPieLabel
              key={selectedPlaylist.playlist.id}
              playlist={selectedPlaylist}
            />
          ))}
        </div>

        {/* Total */}
        <div className="w-full flex flex-col pt-8">
          <div className="w-full flex flex-row">
            <span className="flex-1 text-base font-medium text-black">
              Total
            </span>
            <span
              className={`text-white px-2 py-0.5 rounded text-xs font-medium bg-green-600 flex items-center justify-center h-5`}
            >
              {Math.round(total)}%
            </span>
          </div>
          <div className="w-full h-1 bg-gray-200 mt-1 rounded-sm overflow-hidden">
            <div
              className="h-full bg-green-600"
              style={{ width: `${total}%` }}
            ></div>
          </div>
        </div>
      </div>

      <button className="w-full h-8 mt-5 bg-cyan-500 flex flex-row items-center justify-center text-white rounded">
        Appliquer
        <div className="w-8 h-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            viewBox="0 -960 960 960"
            width="20px"
            fill="#FFF"
          >
            <path d="M666.15-464H232v-32h434.15L457.46-704.69 480-728l248 248-248 248-22.54-23.31L666.15-464Z" />
          </svg>
        </div>
      </button>
    </form>
  );
};

export default Chart;
