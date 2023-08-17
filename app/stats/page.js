"use client";

import { useEffect, useState } from "react";

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

  const [selectedHero, setSelectedHero] = useState("");
  const [heroStats, setHeroStats] = useState({});

  const newProfile = () => {
    if (inputFieldBt.length === 0 || inputFieldId.length === 0) {
      alert("Please provide a Battletag and ID");
    } else {
      const formattedBT =
        inputFieldBt.charAt(0).toUpperCase() +
        inputFieldBt.slice(1).toLowerCase();
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
      setSelectedHero(quickplayHeroList[0][0]);
      setHeroStats(quickplayHeroList[0][1]);
    } else {
      setDisplayStatsObj(competitiveStats);
      setSelectedHero(competitiveHeroList[0][0]);
      setHeroStats(competitiveHeroList[0][1]);
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
        setSelectedHero(quickplayHeroListArr[0][0]);
        setHeroStats(quickplayHeroListArr[0][1]);
      });
  }, [profile]);

  if (!data) {
    return <p>Loading...</p>;
  } else {
    if (data.error === "Player not found") {
      return (
        <div>
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
        </div>
      );
    } else {
      return (
        <div>
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
            Search for Profile
          </button>
          <div className="flex">
            <img src={data.icon} className="mx-8" alt="Profile Image"></img>
            <div>
              <p className="text-2xl font-bold">{data.name}</p>
              <p>Games Played - {data.gamesPlayed}</p>
              <p>Won - {data.gamesWon}</p>
              <p>Lost - {data.gamesLost}</p>
            </div>
          </div>
          <div>
            <div onChange={statsRadioChange}>
              <input
                type="radio"
                value="Quickplay"
                name="stats"
                checked={statsRadioInput === "Quickplay"}
              />{" "}
              Quickplay
              <input
                type="radio"
                value="Competitive"
                name="stats"
                checked={statsRadioInput === "Competitive"}
              />
              Competitive
            </div>
            <div className="flex p-4">
              <div>
                Totals
                <p>
                  Time Played-
                  {displayStatsObj.allHeroes.game.timePlayed}
                </p>
                <p>
                  Eliminations-
                  {displayStatsObj.allHeroes.combat.eliminations}
                </p>
                <p>
                  Final Blows-
                  {displayStatsObj.allHeroes.combat.finalBlows}
                </p>
                <p>
                  Damage-
                  {displayStatsObj.allHeroes.combat.damageDone}
                </p>
                <p>
                  Healing-
                  {displayStatsObj.allHeroes.assists.healingDone}
                </p>
                <p>
                  Offensive Assists-
                  {displayStatsObj.allHeroes.assists.offensiveAssists}
                </p>
                <p>
                  Defensive Assists-
                  {displayStatsObj.allHeroes.assists.defensiveAssists}
                </p>
                <p>
                  Deaths-
                  {displayStatsObj.allHeroes.combat.deaths}
                </p>
              </div>
              <div className="p-4">
                Personal Match Records
                <p>
                  Damage-
                  {displayStatsObj.allHeroes.best.allDamageDoneMostInGame}
                </p>
                <p>
                  Eliminations-
                  {displayStatsObj.allHeroes.best.eliminationsMostInGame}
                </p>
                <p>
                  Kill Streak-
                  {displayStatsObj.allHeroes.best.killsStreakBest}
                </p>
                <p>
                  Healing-
                  {displayStatsObj.allHeroes.best.healingDoneMostInGame}
                </p>
              </div>
            </div>
            <div>
              <select
                name="heros"
                id="hero-select"
                onChange={filterHero}
                value={selectedHero}
              >
                {statsRadioInput === "Quickplay"
                  ? quickplayHeroList.map(([hero, key]) => {
                      return (
                        <option key={hero} value={hero}>
                          {hero}
                        </option>
                      );
                    })
                  : competitiveHeroList.map(([hero, key]) => {
                      return (
                        <option key={hero} value={hero}>
                          {hero}
                        </option>
                      );
                    })}
              </select>

              <div className="flex">
                <div>
                  Totals
                  <p>
                    Time Played-
                    {heroStats.game.timePlayed}
                  </p>
                  <p>
                    Win Percentage -
                    {heroStats.game.winPercentage
                      ? heroStats.game.winPercentage
                      : "0%"}
                  </p>
                  <p>
                    Eliminations -
                    {heroStats.combat
                      ? heroStats.combat.eliminations
                        ? heroStats.combat.eliminations
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Final Blows -
                    {heroStats.combat
                      ? heroStats.combat.finalBlows
                        ? heroStats.combat.finalBlows
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Damage -
                    {heroStats.combat ? heroStats.combat.damageDone : "0"}
                  </p>
                  {/* <p>
                    Support only Offensive Assists -
                    {
                      data.quickPlayStats.careerStats.ana.assists
                        .offensiveAssists
                    }
                  </p> */}
                  {/* <p>
                    support only Defensive Assists -
                    {
                      data.quickPlayStats.careerStats.ana.assists
                        .defensiveAssists
                    }
                  </p> */}
                  <p>
                    Healing -
                    {heroStats.assists
                      ? heroStats.assists.healingDone
                        ? heroStats.assists.healingDone
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Deaths -{heroStats.combat ? heroStats.combat.deaths : "0"}
                  </p>
                </div>
                <div>
                  Personal Match Records
                  <p>
                    Eliminations-
                    {heroStats.best
                      ? heroStats.best.eliminationsMostInGame
                        ? heroStats.best.eliminationsMostInGame
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Final Blows-
                    {heroStats.best
                      ? heroStats.best.finalBlowsMostInGame
                        ? heroStats.best.finalBlowsMostInGame
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Kill Streak-
                    {heroStats.best
                      ? heroStats.best.killsStreakBest
                        ? heroStats.best.killsStreakBest
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Damage-
                    {heroStats.best
                      ? heroStats.best.allDamageDoneMostInGame
                        ? heroStats.best.allDamageDoneMostInGame
                        : "0"
                      : "0"}
                  </p>
                  <p>
                    Healing -
                    {heroStats.assists
                      ? heroStats.assists.healingDoneMostInGame
                        ? heroStats.assists.healingDoneMostInGame
                        : "0"
                      : "0"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
