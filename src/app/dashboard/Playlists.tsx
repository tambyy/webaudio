import DashboardPlaylist from "@/types/dashboard-playlist";
import PlayList from "./(components)/PlayList";

const Playlists = ({ playlists }: { playlists: DashboardPlaylist[] }) => {
  return (
    <>
      {playlists.length > 0 ? (
        <div className="w-full flex-1 grid grid-cols-6 gap-4 py-5">
          {playlists.map((playList: DashboardPlaylist) => (
            <PlayList key={playList.playlist.id} {...playList} />
          ))}
        </div>
      ) : (
        <div className="w-full h-full min-h-80 flex items-center justify-center text-3xl text-gray-300 font-bold">
          Aucune playlist
        </div>
      )}
    </>
  );
};

export default Playlists;
