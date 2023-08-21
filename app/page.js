"use client";

import { useEffect, useState } from "react";
import VIDEOCLIPS from "../public/videodetails.js";
import Link from "next/link";

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedHero, setSelectedHero] = useState("default");

  const [videoArr, setVideoArr] = useState(VIDEOCLIPS);

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

  const [checkedImages, setCheckedImages] = useState([]);

  const toggleImage = (imageSrc) => {
    if (checkedImages.includes(imageSrc)) {
      setCheckedImages(checkedImages.filter((src) => src !== imageSrc));
    } else {
      setCheckedImages([...checkedImages, imageSrc]);
    }
  };

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
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

  useEffect(() => {
    if (checkedImages.length === 0) {
      setSelectedIndex(0);
      setVideoArr(VIDEOCLIPS);
    } else {
      const newVideoArr = [];

      VIDEOCLIPS.map((clip) => {
        checkedImages.includes(clip.hero) ? newVideoArr.push(clip) : null;
      });

      setVideoArr(shuffle(newVideoArr));
      setSelectedIndex(0);
    }
  }, [checkedImages]);

  return (
    <main className="flex flex-col justify-center">
      <div className="bg-[url('/ow-bg4.png')] bg-cover background-container"></div>
      <div className="image-checkboxes flex justify-center pt-8">
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox-input" />
          <img
            src="/icons/Icon-Ana.webp"
            alt="ana"
            className={checkedImages.includes("Ana") ? "checked h-24" : "h-24"}
            onClick={() => toggleImage("Ana")}
          />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox-input" />
          <img
            src="/icons/Icon-Doomfist.webp"
            alt="doomfist"
            className={
              checkedImages.includes("Doomfist") ? "checked h-24" : "h-24"
            }
            onClick={() => toggleImage("Doomfist")}
          />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox-input" />
          <img
            src="/icons/Icon-Genji.webp"
            alt="genji"
            className={
              checkedImages.includes("Genji") ? "checked h-24" : "h-24"
            }
            onClick={() => toggleImage("Genji")}
          />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox-input" />
          <img
            src="/icons/Icon-Sojourn.webp"
            alt="sojourn"
            className={
              checkedImages.includes("Sojourn") ? "checked h-24" : "h-24"
            }
            onClick={() => toggleImage("Sojourn")}
          />
        </label>
        <label className="checkbox-label">
          <input type="checkbox" className="checkbox-input" />
          <img
            src="/icons/Icon-Widowmaker.webp"
            alt="widowmaker"
            className={
              checkedImages.includes("Widowmaker") ? "checked h-24" : "h-24"
            }
            onClick={() => toggleImage("Widowmaker")}
          />
        </label>
      </div>

      <div className="flex mx-auto p-8 z-10">
        {selectedIndex > 0 ? (
          <div className="my-auto bg-black rounded-md text-white p-4">
            <img
              src={videoArr[selectedIndex - 1].img}
              className="side-video"
              alt="video preview"
            />
            <button onClick={decrSelectedIndex} className="border p-2">
              Previous Video
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="side-video"></div>
          </div>
        )}

        <div className="bg-black text-white mx-4 p-4 pb-8 rounded-md">
          <iframe
            src={videoArr[selectedIndex].URL}
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
            <img
              src={videoArr[selectedIndex + 1].img}
              className="side-video"
              alt="video preview"
            />
            <button onClick={incrSelectedIndex} className="border p-2">
              Next Video
            </button>
          </div>
        ) : (
          <div className="p-4">
            <div className="side-video"></div>
          </div>
        )}
      </div>
    </main>
  );
}
