import Tag from "@/types/tag";

const SongTag = ({ tag }: { tag: Tag }) => {
  return (
    <div
      className="flex flex-row px-1 py-0.5 items-center text-xs rounded-sm"
      style={{ color: tag.color, backgroundColor: tag.bgcolor }}
    >
      {tag.name}
    </div>
  );
};

export default SongTag;
