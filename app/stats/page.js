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
          <div className="flex">
            <img src={data.icon} className="mx-8" alt="Profile Image"></img>
            <div className="my-auto">
              <p className="text-2xl font-bold">{data.name}</p>
              <p>Games Played - {data.gamesPlayed}</p>
              <p>Won - {data.gamesWon}</p>
              <p>Lost - {data.gamesLost}</p>
            </div>
          </div>
          <div className="m-8">
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
            <div className="flex">
              <div className="w-60">
                <p className="underline mb-4">Total</p>
                <p className="flex justify-between">
                  <div>Time Played</div>
                  <div className="">
                    {displayStatsObj.allHeroes.game.timePlayed}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Eliminations</div>
                  <div>
                    {displayStatsObj.allHeroes.combat.eliminations.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Final Blows</div>
                  <div>
                    {displayStatsObj.allHeroes.combat.finalBlows.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Damage</div>
                  <div>
                    {displayStatsObj.allHeroes.combat.damageDone.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Healing</div>
                  <div>
                    {displayStatsObj.allHeroes.assists.healingDone.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Off. Assists</div>
                  <div>
                    {displayStatsObj.allHeroes.assists.offensiveAssists.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Def. Assists</div>
                  <div>
                    {displayStatsObj.allHeroes.assists.defensiveAssists.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Deaths</div>
                  <div>
                    {displayStatsObj.allHeroes.combat.deaths.toLocaleString()}
                  </div>
                </p>
              </div>
              <div className="w-60 ml-12">
                <p className="mb-4 underline">Highest</p>
                <p className="flex justify-between">
                  <div>Eliminations</div>
                  <div>
                    {displayStatsObj.allHeroes.best.eliminationsMostInGame.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Final Blows</div>
                  <div>
                    {displayStatsObj.allHeroes.best.finalBlowsMostInGame.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Damage</div>
                  <div>
                    {displayStatsObj.allHeroes.best.allDamageDoneMostInGame.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Kill Streak</div>
                  <div>
                    {displayStatsObj.allHeroes.best.killsStreakBest.toLocaleString()}
                  </div>
                </p>
                <p className="flex justify-between">
                  <div>Healing</div>
                  <div>
                    {displayStatsObj.allHeroes.best.healingDoneMostInGame.toLocaleString()}
                  </div>
                </p>
              </div>
            </div>
            <div>
              <select
                name="heros"
                id="hero-select"
                onChange={filterHero}
                value={selectedHero}
                className="bg-gray-100 my-4"
              >
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
              <div className="flex">
                <div className="w-60">
                  <p className="mb-4 underline">Hero Total</p>
                  <p className="flex justify-between">
                    <div>Time Played</div>
                    <div>{heroStats.game.timePlayed}</div>
                  </p>
                  <p className="flex justify-between">
                    <div>Win Percentage</div>
                    <div>
                      {heroStats.game.winPercentage
                        ? heroStats.game.winPercentage
                        : "0%"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Eliminations</div>
                    <div>
                      {heroStats.combat
                        ? heroStats.combat.eliminations
                          ? heroStats.combat.eliminations.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Final Blows</div>
                    <div>
                      {heroStats.combat
                        ? heroStats.combat.finalBlows
                          ? heroStats.combat.finalBlows.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Damage</div>
                    <div>
                      {heroStats.combat
                        ? heroStats.combat.damageDone.toLocaleString()
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Healing</div>
                    <div>
                      {heroStats.assists
                        ? heroStats.assists.healingDone
                          ? heroStats.assists.healingDone.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Deaths</div>
                    <div>
                      {heroStats.combat
                        ? heroStats.combat.deaths.toLocaleString()
                        : "0"}
                    </div>
                  </p>
                </div>
                <div className="w-60 ml-12">
                  <p className="mb-4 underline">Highest</p>
                  <p className="flex justify-between">
                    <div>Eliminations</div>
                    <div>
                      {heroStats.best
                        ? heroStats.best.eliminationsMostInGame
                          ? heroStats.best.eliminationsMostInGame
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Final Blows</div>
                    <div>
                      {heroStats.best
                        ? heroStats.best.finalBlowsMostInGame
                          ? heroStats.best.finalBlowsMostInGame
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Kill Streak</div>
                    <div>
                      {heroStats.best
                        ? heroStats.best.killsStreakBest
                          ? heroStats.best.killsStreakBest
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Damage</div>
                    <div>
                      {heroStats.best
                        ? heroStats.best.allDamageDoneMostInGame
                          ? heroStats.best.allDamageDoneMostInGame.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Healing</div>
                    <div>
                      {heroStats.assists
                        ? heroStats.assists.healingDoneMostInGame
                          ? heroStats.assists.healingDoneMostInGame.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                </div>
                <div className="w-60 ml-12">
                  <p className="mb-4 underline">Average/10min</p>
                  <p className="flex justify-between">
                    <div>Eliminations</div>
                    <div>
                      {heroStats.average
                        ? heroStats.average.eliminationsAvgPer10Min
                          ? heroStats.average.eliminationsAvgPer10Min
                          : "0"
                        : "0"}
                    </div>
                  </p>

                  <p className="flex justify-between">
                    <div>Final Blows</div>
                    <div>
                      {heroStats.average
                        ? heroStats.average.finalBlowsAvgPer10Min
                          ? heroStats.average.finalBlowsAvgPer10Min
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Damage</div>
                    <div>
                      {heroStats.average
                        ? heroStats.average.allDamageDoneAvgPer10Min
                          ? heroStats.average.allDamageDoneAvgPer10Min.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Healing</div>
                    <div>
                      {heroStats.average
                        ? heroStats.average.healingDoneAvgPer10Min
                          ? heroStats.average.healingDoneAvgPer10Min.toLocaleString()
                          : "0"
                        : "0"}
                    </div>
                  </p>
                  <p className="flex justify-between">
                    <div>Deaths</div>
                    <div>
                      {heroStats.average
                        ? heroStats.average.deathsAvgPer10Min
                          ? heroStats.average.deathsAvgPer10Min
                          : "0"
                        : "0"}
                    </div>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      );
    }
  }
}
