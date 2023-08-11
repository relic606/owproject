"use client";

import { useState } from "react";
import VIDEOCLIPS from "../public/videodetails.js";
import Link from "next/link";

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
    <main className="flex justify-center h-screen bg-[url('/ow-bg.jpg')] bg-contain bg-no-repeat bg-center">
      <Link href="/stats">Stats</Link>
      <div className="flex my-auto bg-white/80 p-8">
        {selectedIndex > 0 ? (
          <div className="my-auto bg-black text-white p-4">
            <p>
              {videoArr[selectedIndex - 1].hero} - {selectedIndex - 1}
            </p>
            <video
              src={videoArr[selectedIndex - 1].URL}
              className="w-60"
            ></video>
            <button onClick={decrSelectedIndex} className="border h-fit">
              Previous Video
            </button>
          </div>
        ) : (
          <div className="w-60"></div>
        )}

        <div className="bg-black text-white mx-4">
          <p>
            {videoArr[selectedIndex].hero} - {selectedIndex}
          </p>

          <video
            src={videoArr[selectedIndex].URL}
            controls
            className="center-video mx-8"
          ></video>
        </div>

        {selectedIndex !== videoArr.length - 1 ? (
          <div className="my-auto bg-black text-white p-4">
            <p>
              {videoArr[selectedIndex + 1].hero} - {selectedIndex + 1}
            </p>
            <video
              src={videoArr[selectedIndex + 1].URL}
              className="w-60"
            ></video>
            <button onClick={incrSelectedIndex} className="border">
              Next Video
            </button>
          </div>
        ) : (
          <div className="w-60"></div>
        )}
      </div>
    </main>
  );
}
