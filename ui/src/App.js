import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [urlLink, setUrl] = useState("");

  const download = async () => {
    try {
      const response = await axios.post("http://localhost:5000", { link: urlLink });
      const array = response.data;
      array.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.url;
        link.download = item.title;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      });
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <>
      <input
        type="text"
        name="link"
        value={urlLink}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste Link...."
      />
      <button onClick={download}>Download</button>
    </>
  );
};

export default App;
