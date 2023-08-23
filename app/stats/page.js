"use client";

import { useEffect, useState } from "react";
import AllHeroStats from "../components/AllHeroStats";
import SelectedHeroStats from "../components/SelectedHeroStats";
import HeroSelect from "../components/HeroSelect";

export default function Stats() {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState("Relic-1203");

  const [inputFieldBt, setInputFieldBt] = useState("");
  const [inputFieldId, setInputFieldId] = useState("");

  const [quickplayHeroList, setQuickplayHeroList] = useState([]);
  const [competitiveHeroList, setCompetitiveHeroList] = useState([]);

  const [statsRadioInput, setStatsRadioInput] = useState("Quickplay");

  const [quickPlayStats, setQuickPlayStats] = useState({});
  const [competitiveStats, setCompetitiveStats] = useState({});
  const [displayStatsObj, setDisplayStatsObj] = useState({});

  const [heroStats, setHeroStats] = useState({});

  const [selectHeroArr, setSelectHeroArr] = useState({});

  const HEROES = [
    {
      id: 0,
      name: "allHeroes",
      avatar: "/icons/icon-Overwatch.png",
    },
    {
      id: 1,
      name: "ana",
      avatar: "/icons/icon-Ana.webp",
    },
    {
      id: 2,
      name: "ashe",
      avatar: "/icons/icon-Ashe.webp",
    },
    {
      id: 3,
      name: "baptiste",
      avatar: "/icons/icon-Baptiste.webp",
    },
    {
      id: 4,
      name: "bastion",
      avatar: "/icons/icon-Bastion.webp",
    },
    {
      id: 5,
      name: "brigitte",
      avatar: "/icons/icon-Brigitte.webp",
    },
    {
      id: 6,
      name: "cassidy",
      avatar: "/icons/icon-cassidy.webp",
    },
    {
      id: 7,
      name: "doomfist",
      avatar: "/icons/icon-Doomfist.webp",
    },
    {
      id: 8,
      name: "genji",
      avatar: "/icons/icon-Genji.webp",
    },
    {
      id: 9,
      name: "hanzo",
      avatar: "/icons/icon-Hanzo.webp",
    },
    {
      id: 10,
      name: "illari",
      avatar: "/icons/icon-Illari.webp",
    },
    {
      id: 11,
      name: "junkerqueen",
      avatar: "/icons/icon-Junker_Queen.webp",
    },
    {
      id: 12,
      name: "junkrat",
      avatar: "/icons/icon-Junkrat.webp",
    },
    {
      id: 13,
      name: "kiriko",
      avatar: "/icons/icon-kiriko.webp",
    },
    {
      id: 14,
      name: "lifeweaver",
      avatar: "/icons/icon-Lifeweaver.webp",
    },
    {
      id: 15,
      name: "lucio",
      avatar: "/icons/icon-Lucio.webp",
    },
    {
      id: 16,
      name: "mei",
      avatar: "/icons/icon-Mei.webp",
    },
    {
      id: 17,
      name: "mercy",
      avatar: "/icons/icon-Mercy.webp",
    },
    {
      id: 18,
      name: "moira",
      avatar: "/icons/icon-Moira.webp",
    },
    {
      id: 19,
      name: "orisa",
      avatar: "/icons/icon-Orisa.webp",
    },
    {
      id: 20,
      name: "pharah",
      avatar: "/icons/icon-Pharah.webp",
    },
    {
      id: 21,
      name: "ramattra",
      avatar: "/icons/icon-Ramattra.webp",
    },
    {
      id: 22,
      name: "reaper",
      avatar: "/icons/icon-Reaper.webp",
    },
    {
      id: 23,
      name: "reinhardt",
      avatar: "/icons/icon-Reinhardt.webp",
    },
    {
      id: 24,
      name: "roadhog",
      avatar: "/icons/icon-Roadhog.webp",
    },
    {
      id: 25,
      name: "sigma",
      avatar: "/icons/icon-Sigma.webp",
    },
    {
      id: 26,
      name: "sojourn",
      avatar: "/icons/icon-Sojourn.webp",
    },
    {
      id: 27,
      name: "soldier76",
      avatar: "/icons/icon-Soldier_76.webp",
    },
    {
      id: 28,
      name: "sombra",
      avatar: "/icons/icon-Sombra.webp",
    },
    {
      id: 29,
      name: "symmetra",
      avatar: "/icons/icon-Symmetra.webp",
    },
    {
      id: 30,
      name: "torbjorn",
      avatar: "/icons/icon-Torbjorn.webp",
    },
    {
      id: 31,
      name: "tracer",
      avatar: "/icons/icon-Tracer.webp",
    },
    {
      id: 32,
      name: "widowmaker",
      avatar: "/icons/icon-Widowmaker.webp",
    },
    {
      id: 33,
      name: "winston",
      avatar: "/icons/icon-Winston.webp",
    },
    {
      id: 34,
      name: "wreckingball",
      avatar: "/icons/icon-Wrecking_Ball.webp",
    },
    {
      id: 35,
      name: "zarya",
      avatar: "/icons/icon-Zarya.webp",
    },
    {
      id: 36,
      name: "zenyatta",
      avatar: "/icons/icon-Zenyatta.webp",
    },
  ];

  const [selectedHero, setSelectedHero] = useState({});

  const newProfile = () => {
    if (inputFieldBt.length === 0 || inputFieldId.length === 0) {
      alert("Please provide a Battletag and ID");
    } else {
      setProfile(inputFieldBt + "-" + inputFieldId);
      setData(null);
    }
  };

  const inputHandlerBt = (e) => {
    setInputFieldBt(e.target.value);
  };
  const inputHandlerId = (e) => {
    setInputFieldId(e.target.value);
  };

  const submitButton = () => {
    newProfile();
  };

  function statsRadioChange(event) {
    setStatsRadioInput(event.target.value);

    if (event.target.value === "Quickplay") {
      setDisplayStatsObj(quickPlayStats);

      const qpHeroArr = [];
      Object.values(quickplayHeroList).map(([hero, stats]) => {
        if (!qpHeroArr.includes(hero)) {
          qpHeroArr.push(hero);
        }
      });

      const newQPHeroesArr = HEROES.filter((hero) => {
        return qpHeroArr.includes(hero.name) || hero.name === "allHeroes";
      });

      setSelectHeroArr(newQPHeroesArr);
      setSelectedHero(newQPHeroesArr[0]);

      // if (selectedHero.name !== "allHeroes") {
      //   const heroArr = [];
      //   Object.values(quickplayHeroList).map(([hero, stats]) => {
      //     if (!heroArr.includes(hero)) {
      //       heroArr.push(hero);
      //     }
      //   });

      //   if (!heroArr.includes(selectedHero.name)) {
      //     setSelectedHero(newQPHeroesArr[0]);
      //   } else {
      //     const newHeroStats = quickplayHeroList.filter(
      //       ([hero, stats]) => hero === selectedHero
      //     )[0][1];
      //     setHeroStats(newHeroStats);
      //   }
      // }
    } else {
      setDisplayStatsObj(competitiveStats);

      const compHeroArr = [];
      Object.values(competitiveHeroList).map(([hero, stats]) => {
        if (!compHeroArr.includes(hero)) {
          compHeroArr.push(hero);
        }
      });

      const newCompHeroesArr = HEROES.filter((hero) => {
        return compHeroArr.includes(hero.name) || hero.name === "allHeroes";
      });

      setSelectHeroArr(newCompHeroesArr);
      setSelectedHero(newCompHeroesArr[0]);

      // if (selectedHero.name !== "allHeroes") {
      //   const heroArr = [];
      //   Object.values(competitiveHeroList).map(([hero, stats]) => {
      //     if (!heroArr.includes(hero)) {
      //       heroArr.push(hero);
      //     }
      //   });

      //   if (!heroArr.includes(selectedHero.name)) {
      //     setSelectedHero(HEROES[0]);
      //   } else {
      //     const newHeroStats = competitiveHeroList.filter(
      //       ([hero, stats]) => hero === selectedHero.name
      //     )[0][1];
      //     setHeroStats(newHeroStats);
      //   }
      // }
    }
  }

  useEffect(() => {
    fetch(`https://ow-api.com/v1/stats/pc/us/${profile}/complete`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data);

        if (data.private === false) {
          setQuickPlayStats(data.quickPlayStats.careerStats);
          setCompetitiveStats(data.competitiveStats.careerStats);
          setDisplayStatsObj(data.quickPlayStats.careerStats);

          const quickplayNewHeroList = Object.entries(
            data.quickPlayStats.careerStats
          );
          const competitiveNewHeroList = Object.entries(
            data.competitiveStats.careerStats
          );

          const qpHeroArr = [];
          Object.values(quickplayNewHeroList).map(([hero, stats]) => {
            if (!qpHeroArr.includes(hero)) {
              qpHeroArr.push(hero);
            }
          });

          const newQPHeroesArr = HEROES.filter((hero) => {
            return qpHeroArr.includes(hero.name) || hero.name === "allHeroes";
          });

          setSelectHeroArr(newQPHeroesArr);
          setSelectedHero(newQPHeroesArr[0]);

          setStatsRadioInput("Quickplay");
          setQuickplayHeroList(quickplayNewHeroList);
          setCompetitiveHeroList(competitiveNewHeroList);
        }
      });
  }, [profile]);

  useEffect(() => {
    if (statsRadioInput === "Quickplay") {
      const newHero = Object.values(quickplayHeroList).filter(
        ([hero, stats]) => {
          return hero === selectedHero.name;
        }
      );
      setHeroStats(newHero[0]);
    } else {
      const newHero = Object.values(competitiveHeroList).filter(
        ([hero, stats]) => {
          return hero === selectedHero.name;
        }
      );
      setHeroStats(newHero[0]);
    }
  }, [selectedHero]);

  if (!data) {
    return <p>Loading...</p>;
  } else {
    if (data.error === "Player not found") {
      return (
        <main>
          <input
            type="text"
            onChange={inputHandlerBt}
            placeholder="Battletag"
            className="border m-4"
          />
          <input
            type="text"
            onChange={inputHandlerId}
            placeholder="ID"
            className="border"
          />
          <button onClick={submitButton} className="mx-4 border">
            Search Profile
          </button>
          <p>Player Not Found</p>
        </main>
      );
    } else if (data.private === true) {
      return (
        <main>
          <input
            type="text"
            onChange={inputHandlerBt}
            placeholder="Battletag"
            className="border m-4"
          />
          <input
            type="text"
            onChange={inputHandlerId}
            placeholder="ID"
            className="border"
          />
          <button onClick={submitButton} className="mx-4 border">
            Search Profile
          </button>
          <p>Profile is set to private</p>
        </main>
      );
    } else {
      return (
        <main>
          <input
            type="text"
            onChange={inputHandlerBt}
            placeholder="Battletag"
            className="border m-4 ml-8"
          />
          <input
            type="text"
            onChange={inputHandlerId}
            placeholder="ID"
            className="border"
          />

          <button onClick={submitButton} className="mx-4 border">
            Search for Profile
          </button>
          <section className="bg-white max-w-6xl mx-auto rounded-lg shadow-xl">
            <div className="flex mx-6 py-6">
              <img
                src={data.icon}
                className="rounded-xl w-16"
                alt="Profile Image"
              ></img>
              <div className="my-auto pl-4">
                <h2 className="a text-xl font-semibold">{data.name}</h2>
                <p className="text-sm font-light">
                  {data.gamesPlayed} Games Played{" "}
                  <span className="px-2 opacity-60 font-normal">&#x2022;</span>{" "}
                  {data.gamesWon} Wins
                  <span className="px-2 opacity-60 font-normal">
                    &#x2022;
                  </span>{" "}
                  {data.gamesLost} Lost
                </p>
              </div>
            </div>
            <div className="h-px bg-gray-300"></div>
            <div className="flex justify-between px-4 pt-4">
              <div onChange={statsRadioChange} className="mb-4">
                <input
                  type="radio"
                  value="Quickplay"
                  name="stats"
                  checked={statsRadioInput === "Quickplay"}
                  className="mr-1"
                />
                Quickplay
                <input
                  type="radio"
                  value="Competitive"
                  name="stats"
                  checked={statsRadioInput === "Competitive"}
                  className="ml-8 mr-1"
                />
                Competitive
              </div>
              {/* <select
                name="heros"
                id="hero-select"
                onChange={filterHero}
                value={selectedHero}
                className="bg-gray-100 my-4"
              >
                <option key="default" value="allHeroes">
                  - All Heroes -
                </option>
                {statsRadioInput === "Quickplay"
                  ? quickplayHeroList.map(([hero, key]) => {
                      const firstLetter = hero.charAt(0).toUpperCase();
                      const remainingLetters = hero.slice(1);
                      return (
                        <option key={hero} value={hero}>
                          {firstLetter + remainingLetters}
                        </option>
                      );
                    })
                  : competitiveHeroList.map(([hero, key]) => {
                      const firstLetter = hero.charAt(0).toUpperCase();
                      const remainingLetters = hero.slice(1);
                      return (
                        <option key={hero} value={hero}>
                          {firstLetter + remainingLetters}
                        </option>
                      );
                    })}
              </select> */}
              <div className="w-60 mb-4">
                <HeroSelect
                  selectedHero={selectedHero}
                  setSelectedHero={setSelectedHero}
                  selectHeroArr={selectHeroArr}
                />
              </div>
            </div>
            {selectedHero.name === "allHeroes" ? (
              <AllHeroStats displayStatsObj={displayStatsObj} />
            ) : (
              <SelectedHeroStats
                selectedHero={selectedHero}
                heroStats={heroStats}
              />
            )}
          </section>
        </main>
      );
    }
  }
}
