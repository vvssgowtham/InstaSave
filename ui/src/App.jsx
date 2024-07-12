import React, { useState } from "react";
import axios from "axios";
import "./app.css";

const App = () => {
  const [urlLink, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [mediaInfo, setMediaInfo] = useState(null);

  const download = async () => {
    try {
      setLoading(true);
      setMediaInfo(null);
      const response = await axios.post("https://instasave-server.onrender.com/download", {
        link: urlLink,
      });
      const mediaArray = response.data;
      setMediaInfo(mediaArray[0]);
      const link = document.createElement("a");
      link.href = mediaArray[0].url;
      link.download = mediaArray[0].url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setUrl("");
    } catch (err) {
      console.error("Download failed:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="lg:flex lg:justify-center lg:items-center overall">
        <div className="form-container lg:w-1/2 xl:w-1/3 p-6">
          <div className="text-center">
            <h1 className="text-4xl mb-4" style={{ fontFamily: "arial" }}>📸InstaSave</h1>
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="link"
              value={urlLink}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste Link...."
              className="input w-full p-3 border border-gray-300 rounded"
            />
          </div>
          <div>
            <button
              onClick={download}
              className="button w-full bg-green-500 text-white p-3 rounded cursor-pointer hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Loading..." : "Download"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
