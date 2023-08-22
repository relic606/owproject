export default function SelectedHeroStats(props) {
  const heroStats = props.heroStats;
  return (
    <div className="px-8 pb-8">
      <div className="flex justify-between">
        <div className="w-full">
          <div>
            <p className="font-semibold pb-2">Hero Total</p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Time Played</span>
              <span>{heroStats.game.timePlayed}</span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Win Percentage</span>
              <span>
                {heroStats.game.winPercentage
                  ? heroStats.game.winPercentage
                  : "0%"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Eliminations</span>
              <span>
                {heroStats.combat
                  ? heroStats.combat.eliminations
                    ? heroStats.combat.eliminations.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {heroStats.combat
                  ? heroStats.combat.finalBlows
                    ? heroStats.combat.finalBlows.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {heroStats.combat
                  ? heroStats.combat.damageDone.toLocaleString()
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {heroStats.assists
                  ? heroStats.assists.healingDone
                    ? heroStats.assists.healingDone.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Deaths</span>
              <span>
                {heroStats.combat
                  ? heroStats.combat.deaths.toLocaleString()
                  : "0"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="w-full">
          <div className="pl-8">
            <p className="font-semibold pb-2">Match Records</p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Eliminations</span>
              <span>
                {heroStats.best
                  ? heroStats.best.eliminationsMostInGame
                    ? heroStats.best.eliminationsMostInGame
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {heroStats.best
                  ? heroStats.best.finalBlowsMostInGame
                    ? heroStats.best.finalBlowsMostInGame
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Kill Streak</span>
              <span>
                {heroStats.best
                  ? heroStats.best.killsStreakBest
                    ? heroStats.best.killsStreakBest
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {heroStats.best
                  ? heroStats.best.allDamageDoneMostInGame
                    ? heroStats.best.allDamageDoneMostInGame.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {heroStats.assists
                  ? heroStats.assists.healingDoneMostInGame
                    ? heroStats.assists.healingDoneMostInGame.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
          </div>
        </div>
        <div className="w-px bg-gray-300"></div>
        <div className="w-full pl-8">
          <div>
            <p className="font-semibold pb-2">Average/10min</p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Eliminations</span>
              <span>
                {heroStats.average
                  ? heroStats.average.eliminationsAvgPer10Min
                    ? heroStats.average.eliminationsAvgPer10Min
                    : "0"
                  : "0"}
              </span>
            </p>

            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {heroStats.average
                  ? heroStats.average.finalBlowsAvgPer10Min
                    ? heroStats.average.finalBlowsAvgPer10Min
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {heroStats.average
                  ? heroStats.average.allDamageDoneAvgPer10Min
                    ? heroStats.average.allDamageDoneAvgPer10Min.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {heroStats.average
                  ? heroStats.average.healingDoneAvgPer10Min
                    ? heroStats.average.healingDoneAvgPer10Min.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Deaths</span>
              <span>
                {heroStats.average
                  ? heroStats.average.deathsAvgPer10Min
                    ? heroStats.average.deathsAvgPer10Min
                    : "0"
                  : "0"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
