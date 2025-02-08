import Tabs from "@/components/Tabs";

const SongsTab = ({ onChange }: { onChange: (i: number) => void }) => {
  return (
    <Tabs
      tabs={["Mes fichiers", "Bibiothèque"]}
      render={(tab: string, selected: boolean) => (
        <div
          className={`h-9 flex items-center justify-center px-3 border-b-2 ${
            selected
              ? "border-cyan-500 text-purple-800"
              : "border-transparent text-black"
          }`}
        >
          {tab}
        </div>
      )}
      onChange={onChange}
    />
  );
};

export default SongsTab;
