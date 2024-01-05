import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [urlLink, setUrl] = useState("");

  const download = async () => {
    try {
      const response = await axios.post("http://localhost:5000", { link: urlLink });
      
      
    } catch (err) {
      console.log(err);
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
