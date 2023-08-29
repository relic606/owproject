"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import AllHeroStats from "../components/AllHeroStats";
import SelectedHeroStats from "../components/SelectedHeroStats";
import HeroSelect from "../components/HeroSelect";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import copy from "copy-to-clipboard";

export default function Stats() {
  const [data, setData] = useState(null);

  const [profile, setProfile] = useState("");

  const [quickplayHeroList, setQuickplayHeroList] = useState([]);
  const [competitiveHeroList, setCompetitiveHeroList] = useState([]);

  const [statsRadioInput, setStatsRadioInput] = useState("Quickplay");

  const [quickPlayStats, setQuickPlayStats] = useState({});
  const [competitiveStats, setCompetitiveStats] = useState({});
  const [displayStatsObj, setDisplayStatsObj] = useState({});

  const [heroStats, setHeroStats] = useState({});

  const [selectHeroArr, setSelectHeroArr] = useState({});
  const [selectedHero, setSelectedHero] = useState({});

  const HEROES = [
    {
      id: 0,
      name: "allHeroes",
      avatar: "/projects/overwatch/icons/icon-Overwatch.png",
    },
    {
      id: 1,
      name: "ana",
      avatar: "/projects/overwatch/icons/icon-Ana.webp",
    },
    {
      id: 2,
      name: "ashe",
      avatar: "/projects/overwatch/icons/icon-Ashe.webp",
    },
    {
      id: 3,
      name: "baptiste",
      avatar: "/projects/overwatch/icons/icon-Baptiste.webp",
    },
    {
      id: 4,
      name: "bastion",
      avatar: "/projects/overwatch/icons/icon-Bastion.webp",
    },
    {
      id: 5,
      name: "brigitte",
      avatar: "/projects/overwatch/icons/icon-Brigitte.webp",
    },
    {
      id: 6,
      name: "cassidy",
      avatar: "/projects/overwatch/icons/icon-cassidy.webp",
    },
    {
      id: 7,
      name: "doomfist",
      avatar: "/projects/overwatch/icons/icon-Doomfist.webp",
    },
    {
      id: 8,
      name: "genji",
      avatar: "/projects/overwatch/icons/icon-Genji.webp",
    },
    {
      id: 9,
      name: "hanzo",
      avatar: "/projects/overwatch/icons/icon-Hanzo.webp",
    },
    {
      id: 10,
      name: "illari",
      avatar: "/projects/overwatch/icons/icon-Illari.webp",
    },
    {
      id: 11,
      name: "junkerqueen",
      avatar: "/projects/overwatch/icons/icon-Junker_Queen.webp",
    },
    {
      id: 12,
      name: "junkrat",
      avatar: "/projects/overwatch/icons/icon-Junkrat.webp",
    },
    {
      id: 13,
      name: "kiriko",
      avatar: "/projects/overwatch/icons/icon-kiriko.webp",
    },
    {
      id: 14,
      name: "lifeweaver",
      avatar: "/projects/overwatch/icons/icon-Lifeweaver.webp",
    },
    {
      id: 15,
      name: "lucio",
      avatar: "/projects/overwatch/icons/icon-Lucio.webp",
    },
    {
      id: 16,
      name: "mei",
      avatar: "/projects/overwatch/icons/icon-Mei.webp",
    },
    {
      id: 17,
      name: "mercy",
      avatar: "/projects/overwatch/icons/icon-Mercy.webp",
    },
    {
      id: 18,
      name: "moira",
      avatar: "/projects/overwatch/icons/icon-Moira.webp",
    },
    {
      id: 19,
      name: "orisa",
      avatar: "/projects/overwatch/icons/icon-Orisa.webp",
    },
    {
      id: 20,
      name: "pharah",
      avatar: "/projects/overwatch/icons/icon-Pharah.webp",
    },
    {
      id: 21,
      name: "ramattra",
      avatar: "/projects/overwatch/icons/icon-Ramattra.webp",
    },
    {
      id: 22,
      name: "reaper",
      avatar: "/projects/overwatch/icons/icon-Reaper.webp",
    },
    {
      id: 23,
      name: "reinhardt",
      avatar: "/projects/overwatch/icons/icon-Reinhardt.webp",
    },
    {
      id: 24,
      name: "roadhog",
      avatar: "/projects/overwatch/icons/icon-Roadhog.webp",
    },
    {
      id: 25,
      name: "sigma",
      avatar: "/projects/overwatch/icons/icon-Sigma.webp",
    },
    {
      id: 26,
      name: "sojourn",
      avatar: "/projects/overwatch/icons/icon-Sojourn.webp",
    },
    {
      id: 27,
      name: "soldier76",
      avatar: "/projects/overwatch/icons/icon-Soldier_76.webp",
    },
    {
      id: 28,
      name: "sombra",
      avatar: "/projects/overwatch/icons/icon-Sombra.webp",
    },
    {
      id: 29,
      name: "symmetra",
      avatar: "/projects/overwatch/icons/icon-Symmetra.webp",
    },
    {
      id: 30,
      name: "torbjorn",
      avatar: "/projects/overwatch/icons/icon-Torbjorn.webp",
    },
    {
      id: 31,
      name: "tracer",
      avatar: "/projects/overwatch/icons/icon-Tracer.webp",
    },
    {
      id: 32,
      name: "widowmaker",
      avatar: "/projects/overwatch/icons/icon-Widowmaker.webp",
    },
    {
      id: 33,
      name: "winston",
      avatar: "/projects/overwatch/icons/icon-Winston.webp",
    },
    {
      id: 34,
      name: "wreckingball",
      avatar: "/projects/overwatch/icons/icon-Wrecking_Ball.webp",
    },
    {
      id: 35,
      name: "zarya",
      avatar: "/projects/overwatch/icons/icon-Zarya.webp",
    },
    {
      id: 36,
      name: "zenyatta",
      avatar: "/projects/overwatch/icons/icon-Zenyatta.webp",
    },
  ];

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

      if (selectedHero.name !== "allHeroes") {
        const selectHeroMatch = newQPHeroesArr.filter((hero) => {
          return hero.name === selectedHero.name;
        });

        if (selectHeroMatch.length === 1) {
          setSelectedHero(selectHeroMatch[0]);
        } else {
          setSelectedHero(newQPHeroesArr[0]);
        }
      }
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

      if (selectedHero.name !== "allHeroes") {
        const selectHeroMatch = newCompHeroesArr.filter((hero) => {
          return hero.name === selectedHero.name;
        });

        if (selectHeroMatch.length === 1) {
          setSelectedHero(selectHeroMatch[0]);
        } else {
          setSelectedHero(newCompHeroesArr[0]);
        }
      }
    }
  }

  function shareBtn() {
    copy(window.location.href);
    alert("Copied to clipboard");
  }

  // copy("Text");

  // Copy with options

  useEffect(() => {
    let urlParams = "";
    if (window.location.search !== "") {
      urlParams = new URLSearchParams(window.location.search)
        .get("profile")
        .replace("#", "-");
      setProfile(urlParams);
    } else {
      urlParams = "Relic-1203";
      setProfile("Relic-1203");
    }

    fetch(`https://ow-api.com/v1/stats/pc/us/${urlParams}/complete`)
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
    return (
      <main>
        <SearchProfile
          profile={profile}
          setData={setData}
          setProfile={setProfile}
        />
        <div className="bg-white max-w-xl mx-auto rounded-md p-8 border border-gray-300 drop-shadow-md">
          <p className=" text-lg">Loading...</p>
        </div>
      </main>
    );
  } else {
    if (
      data.error === "Player not found" ||
      data.error === "Invalid platform"
    ) {
      return (
        <main>
          <SearchProfile
            profile={profile}
            setData={setData}
            setProfile={setProfile}
          />
          <div className="bg-white max-w-xl mx-auto rounded-md p-8 border border-gray-300 drop-shadow-md">
            <p className=" text-lg font-semibold">Player Not Found</p>
            <p className=" font-light">
              Change Battletag#ID and try again - Note the battletag is case
              sensitive
            </p>
          </div>
        </main>
      );
    } else if (data.private === true) {
      return (
        <main>
          <SearchProfile
            profile={profile}
            setData={setData}
            setProfile={setProfile}
          />
          <div className="bg-white max-w-xl mx-auto rounded-md p-8 border border-gray-300 drop-shadow-md">
            <p className=" text-lg font-semibold">Profile is set to private</p>
            <p className=" font-light">Try a different profile</p>
          </div>
          <p></p>
        </main>
      );
    } else {
      return (
        <main>
          <SearchProfile
            profile={profile}
            setData={setData}
            setProfile={setProfile}
          />
          <section className="bg-white max-w-6xl min-w-fit mx-auto rounded-lg shadow-xl">
            <div className="flex mx-6 py-6 justify-between">
              <div className="flex">
                <img
                  src={data.icon}
                  className="rounded-xl h-fit w-16"
                  alt="Profile Image"
                ></img>
                <div className="my-auto pl-4">
                  <h2 className="a text-xl font-semibold">{data.name}</h2>
                  <p className="text-sm font-light">
                    {data.gamesPlayed} Games Played{" "}
                    <span className="px-2 opacity-60 font-normal">
                      &#x2022;
                    </span>{" "}
                    {data.gamesWon} Wins
                    <span className="px-2 opacity-60 font-normal">
                      &#x2022;
                    </span>{" "}
                    {data.gamesLost} Lost
                  </p>
                </div>
              </div>
              <div>
                {data.ratings ? (
                  <div className="flex h-12pr-5 text-sm">
                    {data.ratings.map((roleRank) => {
                      function formatName(name) {
                        const firstLetter = name.charAt(0).toUpperCase();
                        const remainingLetters = name.slice(1);
                        return firstLetter + remainingLetters;
                      }

                      return (
                        <div
                          key={roleRank.role}
                          className="flex flex-col justify-center pl-8 font-light min-w-fit"
                        >
                          {roleRank.role === "offense" ? (
                            <p className="mx-auto">Damage</p>
                          ) : (
                            <p className="mx-auto">
                              {formatName(roleRank.role)}
                            </p>
                          )}
                          <img
                            src={roleRank.rankIcon}
                            className="h-14 w-fit mx-auto"
                            alt="rank icon"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
              <div className="my-auto">
                <button
                  onClick={shareBtn}
                  className="py-2 px-4 border border-gray-300 rounded-md flex"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 mr-2 my-auto"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
            <div className="h-px bg-gray-300"></div>
            <div className="flex justify-between px-4 pt-6 mb-8">
              <div
                onChange={statsRadioChange}
                className="pl-4 flex flex-nowrap h-fit my-auto"
              >
                <input
                  type="radio"
                  value="Quickplay"
                  name="stats"
                  checked={statsRadioInput === "Quickplay"}
                  className="mr-1"
                  id="quickplay"
                />
                <label for="quickplay">Quickplay</label>
                <input
                  type="radio"
                  value="Competitive"
                  name="stats"
                  checked={statsRadioInput === "Competitive"}
                  className="ml-8 mr-1"
                  id="competitive"
                />
                <label for="competitive">Competitive</label>
              </div>

              <div className=" w-64 mr-4 mt-2">
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

function SearchProfile(props) {
  const [inputField, setInputField] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputHandler = (e) => {
    setInputField(e.target.value);
  };

  const newProfile = () => {
    router.push(pathname + "?" + createQueryString("profile", inputField));
    if (inputField.length === 0 || !inputField.includes("#")) {
      alert(
        "Please provide your Battletag and ID with a # separating the values"
      );
    } else {
      if (inputField.replace("#", "-") !== props.profile) {
        props.setProfile(inputField.replace("#", "-"));
        props.setData(null);
      }
    }
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="flex justify-center py-4 mt-8">
      <div className="flex flex-nowrap">
        <input
          type="text"
          onChange={inputHandler}
          placeholder="Battletag#ID"
          className=" pl-4 h-full rounded-l-md border border-gray-300"
        />
        <button
          onClick={newProfile}
          className="orange-bg rounded-r-md text-white p-2 px-4"
        >
          Search for Profile
        </button>
      </div>
    </div>
  );
}
