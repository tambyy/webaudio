import { useState } from "react";

const AICover = ({ playlist, onLoaded }) => {
  const [fetching, setFetching] = useState(false);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onChange(event.target.files[0]);
    }
  };

  // Convert image data URL to File
  const convertDataUrlToFile = (dataUrl: string, filename: string) => {
    const mimeType = "image/jpeg";
    const binaryData = atob(dataUrl); // Decode base64 to binary string

    const byteArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      byteArray[i] = binaryData.charCodeAt(i);
    }

    return new File([byteArray], filename + ".jpg", { type: mimeType });
  };

  const fetchAIImage = async () => {
    if (fetching) {
      return;
    }

    setFetching(true);
    const imagePigApiKey = process.env.NEXT_PUBLIC_NEXT_IMAGEPIG_API_KEY;

    if (!imagePigApiKey) {
      alert("IMAGEPIG API KEY undefined");
      return;
    }

    try {
      const response = await fetch("https://api.imagepig.com/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Api-Key": imagePigApiKey,
        },
        body: JSON.stringify({ prompt: `Album cover ${playlist.name}` }),
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const imageFile = convertDataUrlToFile(json.image_data, playlist.name);

      onLoaded(imageFile);
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div
      className="w-32 h-8 px-3 flex flex-row items-center justify-center text-cyan-500 cursor-pointer"
      onClick={fetchAIImage}
    >
      <div className="w-8 h-full flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 -960 960 960"
          width="20px"
          fill="#06b6d4"
        >
          <path d="M212-164v-172.85q0-26.54 18.9-45.38 18.91-18.85 45.45-18.85h407.62q26.55 0 45.29 18.89T748-336.77V-164H212Zm165.52-300.46q-68.84 0-117.18-48.55T212-630.44q0-68.88 48.52-117.22T377.88-796h204.6q68.84 0 117.18 48.55T748-630.02q0 68.88-48.52 117.22t-117.36 48.34h-204.6ZM264-216h432v-120.77q0-5.38-3.46-8.85-3.46-3.46-8.85-3.46H276.31q-5.39 0-8.85 3.46-3.46 3.47-3.46 8.85V-216Zm113.77-300.46h204.46q47.69 0 80.73-33.04Q696-582.54 696-630.23q0-47.69-33.04-80.73Q629.92-744 582.23-744H377.77q-47.69 0-80.73 33.04Q264-677.92 264-630.23q0 47.69 33.04 80.73 33.04 33.04 80.73 33.04Zm-.22-83.16q12.91 0 21.87-8.73 8.96-8.74 8.96-21.66 0-12.91-8.73-21.87-8.74-8.97-21.66-8.97-12.91 0-21.87 8.74-8.97 8.74-8.97 21.66 0 12.91 8.74 21.87t21.66 8.96Zm204.46 0q12.91 0 21.87-8.73 8.97-8.74 8.97-21.66 0-12.91-8.74-21.87-8.74-8.97-21.66-8.97-12.91 0-21.87 8.74t-8.96 21.66q0 12.91 8.73 21.87 8.74 8.96 21.66 8.96ZM480-216Zm0-414.23Z" />
        </svg>
      </div>
      {fetching ? "Loading ..." : "IA"}
    </div>
  );
};

export default AICover;
