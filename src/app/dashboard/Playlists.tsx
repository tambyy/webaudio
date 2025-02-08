import DashboardPlaylist from "@/types/dashboard-playlist";
import PlayList from "./(components)/PlayList";

const Playlists = ({ playlists }: { playlists: DashboardPlaylist[] }) => {
  return (
    <div className="w-full flex-1 grid grid-cols-6 gap-4 py-5">
      {playlists.map((playList: DashboardPlaylist) => (
        <PlayList key={playList.playlist.id} {...playList} />
      ))}
    </div>
  );
};

export default Playlists;
