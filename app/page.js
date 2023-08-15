"use client";

import { useEffect, useState } from "react";
import VIDEOCLIPS from "../public/videodetails.js";
import Link from "next/link";

export default function Home() {
  const [videoArr, setVideoArr] = useState(VIDEOCLIPS);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHero, setSelectedHero] = useState("default");

  const initHeroArr = [];
  videoArr.forEach(function (highlight, index) {
    if (!initHeroArr.includes(highlight.hero)) {
      initHeroArr.push(highlight.hero);
    }
  });

  const [heroArr, setHeroArr] = useState(initHeroArr);

  function filterHero(e) {
    setVideoArr(VIDEOCLIPS);
    const newSelectedHero = e.target.value;
    setSelectedHero(newSelectedHero);
    setSelectedIndex(0);
  }

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

  useEffect(() => {
    if (selectedHero !== "default") {
      const newVideoArr = videoArr;
      const filteredArr = newVideoArr.filter((highlight) => {
        return highlight.hero === selectedHero;
      });
      setVideoArr(filteredArr);
    }
  }, [selectedHero]);

  return (
    <main className="flex justify-center h-screen bg-[url('/ow-bg.jpg')] bg-contain bg-no-repeat bg-center">
      <Link href="/stats" className="absolute p-2 bg-white">
        Stats
      </Link>

      <div className="h-fit w-fit absolute left-24 bg-white border-black border p-1">
        <label for="hero-select">Choose a Hero:</label>
        <select
          name="heros"
          id="hero-select"
          onChange={filterHero}
          value={selectedHero}
        >
          <option value="default">- All Heroes -</option>
          {heroArr.map((hero) => {
            return (
              <option key={hero} value={hero}>
                {hero}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex my-auto bg-white/90 p-8">
        {selectedIndex > 0 ? (
          <div className="my-auto bg-black rounded-md text-white p-4">
            <p>{videoArr[selectedIndex - 1].hero}</p>
            <iframe
              src={`https://www.youtube.com/embed/${
                videoArr[selectedIndex - 1].ID
              }?controls=0`}
              frameborder="0"
              allow="autoplay; encrypted-media"
              title="video"
              className="side-video"
            />
            <button onClick={decrSelectedIndex} className="border p-2">
              Previous Video
            </button>
          </div>
        ) : (
          <div className="side-video"></div>
        )}

        <div className="bg-black text-white mx-4 p-4 pb-8 rounded-md">
          <p>{videoArr[selectedIndex].hero}</p>
          <iframe
            src={`https://www.youtube.com/embed/${videoArr[selectedIndex].ID}`}
            frameborder="0"
            modestbranding
            allow="autoplay; encrypted-media"
            allowFullScreen="allowfullscreen"
            mozallowfullscreen="mozallowfullscreen"
            msallowfullscreen="msallowfullscreen"
            oallowfullscreen="oallowfullscreen"
            webkitallowfullscreen="webkitallowfullscreen"
            title="video"
            className="center-video"
          />
        </div>
        {selectedIndex !== videoArr.length - 1 ? (
          <div className="my-auto bg-black rounded-md text-white p-4">
            <p>{videoArr[selectedIndex + 1].hero}</p>
            <iframe
              src={`https://www.youtube.com/embed/${
                videoArr[selectedIndex + 1].ID
              }?controls=0`}
              frameborder="0"
              modestbranding
              allow="autoplay; encrypted-media"
              title="video"
              className="side-video"
            />
            <button onClick={incrSelectedIndex} className="border p-2">
              Next Video
            </button>
          </div>
        ) : (
          <div className="side-video"></div>
        )}
      </div>
    </main>
  );
}
