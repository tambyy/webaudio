import Song from "./song";
import Tag from "./tag";

export default interface Playlist {
  id: number;
  name: string;
  cover: string;
  color?: string;
  songs?: Song[];
  tags?: Tag[];
}
