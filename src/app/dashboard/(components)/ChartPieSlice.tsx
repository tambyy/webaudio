"use client";

import DashboardPlaylist from "@/types/dashboard-playlist";

const ChartPieSlice = ({
  playlist,
  dashoffset,
}: {
  playlist: DashboardPlaylist;
  dashoffset: number;
}) => {
  return (
    <circle
      className="hover:scale-95 stroke-6 -rotate-90 ease-in-out duration-150"
      style={{
        fill: "none",
        strokeWidth: 12,
        transformOrigin: "center",
      }}
      cx="16"
      cy="16"
      r="15.915"
      stroke={playlist.playlist.color}
      strokeDasharray={`${playlist.repartition} ${100 - playlist.repartition}`}
      strokeDashoffset={dashoffset}
    />
  );
};

export default ChartPieSlice;
