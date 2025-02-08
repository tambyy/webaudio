import Tag from "./tag";

export default interface Song {
  id: number;
  name: string;
  singer: string;
  path: string;
  duration: number;
  favorite?: boolean;
  tags?: Tag[];
}
