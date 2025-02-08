import Playlist from "./playlist";

export default interface DashboardPlaylist {
  playlist: Playlist;
  selected: boolean;
  repartition: number;
}
