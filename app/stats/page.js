"use client";

import { useEffect, useState } from "react";
import AllHeroStats from "../components/AllHeroStats";
import SelectedHeroStats from "../components/SelectedHeroStats";

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

  const [selectedHero, setSelectedHero] = useState("allHeroes");
  const [heroStats, setHeroStats] = useState({});

  const newProfile = () => {
    if (inputFieldBt.length === 0 || inputFieldId.length === 0) {
      alert("Please provide a Battletag and ID");
    } else {
      const formattedBT =
        // inputFieldBt.charAt(0).toUpperCase() +
        // inputFieldBt.slice(1).toLowerCase();
        inputFieldBt;
      setProfile(formattedBT + "-" + inputFieldId);
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

      if (selectedHero !== "allHeroes") {
        const heroArr = [];
        Object.values(quickplayHeroList).map(([hero, stats]) => {
          if (!heroArr.includes(hero)) {
            heroArr.push(hero);
          }
        });

        if (!heroArr.includes(selectedHero)) {
          setSelectedHero("allHeroes");
        } else {
          const newHeroStats = quickplayHeroList.filter(
            ([hero, stats]) => hero === selectedHero
          )[0][1];
          setHeroStats(newHeroStats);
        }
      }
    } else {
      setDisplayStatsObj(competitiveStats);

      if (selectedHero !== "allHeroes") {
        const heroArr = [];
        Object.values(competitiveHeroList).map(([hero, stats]) => {
          if (!heroArr.includes(hero)) {
            heroArr.push(hero);
          }
        });

        if (!heroArr.includes(selectedHero)) {
          setSelectedHero("allHeroes");
        } else {
          const newHeroStats = competitiveHeroList.filter(
            ([hero, stats]) => hero === selectedHero
          )[0][1];
          setHeroStats(newHeroStats);
        }
      }
    }
  }

  function filterHero(e) {
    const newSelectedHero = e.target.value;
    const statsAsArr = Object.entries(displayStatsObj);
    const filteredArr = statsAsArr.filter(([heroName, value]) => {
      return heroName === newSelectedHero;
    });

    setSelectedHero(newSelectedHero);
    setHeroStats(filteredArr[0][1]);
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
          const quickplayHeroListArr = quickplayNewHeroList.filter(
            ([heroName, value]) => {
              return heroName !== "allHeroes";
            }
          );
          const competitiveHeroListArr = competitiveNewHeroList.filter(
            ([heroName, value]) => {
              return heroName !== "allHeroes";
            }
          );
          setStatsRadioInput("Quickplay");
          setQuickplayHeroList(quickplayHeroListArr);
          setCompetitiveHeroList(competitiveHeroListArr);
          setSelectedHero("allHeroes");
        }
      });
  }, [profile]);

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
                <p className="a text-xl font-semibold">{data.name}</p>
                <div className="text-sm font-light">
                  {data.gamesPlayed} Games Played - {data.gamesWon} Wins -{" "}
                  {data.gamesLost} Lost
                </div>
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
              <select
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
              </select>
            </div>
            {selectedHero === "allHeroes" ? (
              <AllHeroStats displayStatsObj={displayStatsObj} />
            ) : (
              <SelectedHeroStats heroStats={heroStats} />
            )}
          </section>
        </main>
      );
    }
  }
}
