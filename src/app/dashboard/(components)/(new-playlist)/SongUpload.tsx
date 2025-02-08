const SongUpload = ({ onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files ? e.dataTransfer.files[0] : null;
    if (selectedFile) {
      onChange(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
  };

  return (
    <label
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="flex flex-col p-4 gap-0.5 items-center bg-gray-50 border border-gray-200 mb-4 rounded cursor-pointer hover:bg-gray-100"
    >
      <input
        className="hidden"
        type="file"
        accept="audio/*"
        onChange={handleFileChange}
      />
      <div className="w-8 h-8 flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="#333"
        >
          <path d="M450-328.46v-336l-98.61 98.61-42.16-43.38L480-780l170.77 170.77-42.16 43.38L510-664.46v336h-60ZM252.31-180Q222-180 201-201q-21-21-21-51.31v-108.46h60v108.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h455.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-108.46h60v108.46Q780-222 759-201q-21 21-51.31 21H252.31Z" />
        </svg>
      </div>
      <span className="text-xs text-gray-600">Glissez vos fichiers ici ou</span>
      <div className="px-4 py-1 text-blue-600 bg-blue-100 rounded">
        Parcourir
      </div>
    </label>
  );
};

export default SongUpload;
