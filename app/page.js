"use client";

import { useState } from "react";
import VIDEOCLIPS from "../public/videodetails.js";

export default function Home() {
  const [videoArr, setVideoArr] = useState(VIDEOCLIPS);
  const [selectedIndex, setSelectedIndex] = useState(0);

  function incrSelectedIndex() {
    if (selectedIndex !== videoArr.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedIndex(newIndex);
    }
  }
  function decrSelectedIndex() {
    if (selectedIndex !== 0) {
      const newIndex = selectedIndex - 1;
      setSelectedIndex(newIndex);
    }
  }

  return (
    <main className="flex justify-center">
      <button onClick={decrSelectedIndex} className="border">
        Previous Video
      </button>

      {selectedIndex > 0 ? (
        <div>
          <p>
            {videoArr[selectedIndex - 1].hero} - {selectedIndex - 1}
          </p>
          <video src={videoArr[selectedIndex - 1].URL} className="w-60"></video>
        </div>
      ) : (
        <div className="w-60"></div>
      )}
      <div>
        <p>
          {videoArr[selectedIndex].hero} - {selectedIndex}
        </p>
        <video
          src={videoArr[selectedIndex].URL}
          controls
          className="w-96"
        ></video>
      </div>
      {selectedIndex !== videoArr.length - 1 ? (
        <div>
          <p>
            {videoArr[selectedIndex + 1].hero} - {selectedIndex + 1}
          </p>
          <video src={videoArr[selectedIndex + 1].URL} className="w-60"></video>
        </div>
      ) : (
        <div className="w-60"></div>
      )}
      <button onClick={incrSelectedIndex} className="border">
        Next Video
      </button>
    </main>
  );
}
