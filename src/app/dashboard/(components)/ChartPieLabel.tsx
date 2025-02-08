"use client";

import DashboardPlaylist from "@/types/dashboard-playlist";

const ChartPieLabel = ({ playlist }: { playlist: DashboardPlaylist }) => {
  return (
    <div className="flex flex-row gap-3 items-center py-0.5">
      <div
        className="w-3 h-3 rounded-full"
        style={{ backgroundColor: playlist.playlist.color }}
      ></div>
      <div className="text-sm font-medium text-gray-400">
        {playlist.playlist.name}
      </div>
    </div>
  );
};

export default ChartPieLabel;
