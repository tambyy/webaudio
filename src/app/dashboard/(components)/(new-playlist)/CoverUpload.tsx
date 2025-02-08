const CoverUpload = ({ onChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  return (
    <label className="w-32 h-8 px-3 border-r border-cyan-500 flex flex-row items-center justify-center text-cyan-500 cursor-pointer">
      <input className="hidden" type="file" onChange={handleFileChange} />
      <div className="w-8 h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#06b6d4"
        >
          <path d="M454-344.46v-352l-99.61 99.61-37.16-36.38L480-796l162.77 162.77-37.16 36.38L506-696.46v352h-52ZM276.03-212q-27.03 0-45.53-18.65T212-276.31v-60.46h52v60.46q0 4.62 3.85 8.46 3.84 3.85 8.46 3.85h407.38q4.62 0 8.46-3.85 3.85-3.84 3.85-8.46v-60.46h52v60.46q0 27.01-18.66 45.66Q710.68-212 683.65-212H276.03Z" />
        </svg>
      </div>
      Upload
    </label>
  );
};

export default CoverUpload;
