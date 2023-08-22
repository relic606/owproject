export default function AllHeroStats(props) {
  const displayStatsObj = props.displayStatsObj;
  return (
    <div className="px-8 pb-8">
      <div className="flex justify-around">
        <div className="w-full">
          <p className="font-semibold pb-2">Total</p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Time Played</span>
            <span>{displayStatsObj.allHeroes.game.timePlayed}</span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Eliminations</span>
            <span>
              {displayStatsObj.allHeroes.combat.eliminations.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Final Blows</span>
            <span>
              {displayStatsObj.allHeroes.combat.finalBlows.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Damage</span>
            <span>
              {displayStatsObj.allHeroes.combat.damageDone.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Healing</span>
            <span>
              {displayStatsObj.allHeroes.assists.healingDone.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Off. Assists</span>
            <span>
              {displayStatsObj.allHeroes.assists.offensiveAssists.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Def. Assists</span>
            <span>
              {displayStatsObj.allHeroes.assists.defensiveAssists.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Deaths</span>
            <span>
              {displayStatsObj.allHeroes.combat.deaths.toLocaleString()}
            </span>
          </p>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="w-full pl-8">
          <p className="font-semibold pb-2">Match Records</p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Eliminations</span>
            <span>
              {displayStatsObj.allHeroes.best.eliminationsMostInGame.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Final Blows</span>
            <span>
              {displayStatsObj.allHeroes.best.finalBlowsMostInGame.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Damage</span>
            <span>
              {displayStatsObj.allHeroes.best.allDamageDoneMostInGame.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Kill Streak</span>
            <span>
              {displayStatsObj.allHeroes.best.killsStreakBest.toLocaleString()}
            </span>
          </p>
          <p className="flex py-2">
            <span className="w-64 text-gray-500">Healing</span>
            <span>
              {displayStatsObj.allHeroes.best.healingDoneMostInGame.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
