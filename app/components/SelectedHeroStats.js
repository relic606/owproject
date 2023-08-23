export default function SelectedHeroStats(props) {



  return (
    <div className="px-8 pb-8">
      <div className="flex justify-between">
        <div className="w-full">
          <div>
            <p className="font-semibold pb-2">Hero Total</p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Time Played</span>
              <span>{props.heroStats[1].game.timePlayed}</span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Win Percentage</span>
              <span>
                {props.heroStats[1].game.winPercentage
                  ? props.heroStats[1].game.winPercentage
                  : "0%"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Eliminations</span>
              <span>
                {props.heroStats[1].combat
                  ? props.heroStats[1].combat.eliminations
                    ? props.heroStats[1].combat.eliminations.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {props.heroStats[1].combat
                  ? props.heroStats[1].combat.finalBlows
                    ? props.heroStats[1].combat.finalBlows.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {props.heroStats[1].combat
                  ? props.heroStats[1].combat.damageDone.toLocaleString()
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {props.heroStats[1].assists
                  ? props.heroStats[1].assists.healingDone
                    ? props.heroStats[1].assists.healingDone.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Deaths</span>
              <span>
                {props.heroStats[1].combat
                  ? props.heroStats[1].combat.deaths.toLocaleString()
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
                {props.heroStats[1].best
                  ? props.heroStats[1].best.eliminationsMostInGame
                    ? props.heroStats[1].best.eliminationsMostInGame
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {props.heroStats[1].best
                  ? props.heroStats[1].best.finalBlowsMostInGame
                    ? props.heroStats[1].best.finalBlowsMostInGame
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Kill Streak</span>
              <span>
                {props.heroStats[1].best
                  ? props.heroStats[1].best.killsStreakBest
                    ? props.heroStats[1].best.killsStreakBest
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {props.heroStats[1].best
                  ? props.heroStats[1].best.allDamageDoneMostInGame
                    ? props.heroStats[1].best.allDamageDoneMostInGame.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {props.heroStats[1].assists
                  ? props.heroStats[1].assists.healingDoneMostInGame
                    ? props.heroStats[1].assists.healingDoneMostInGame.toLocaleString()
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
                {props.heroStats[1].average
                  ? props.heroStats[1].average.eliminationsAvgPer10Min
                    ? props.heroStats[1].average.eliminationsAvgPer10Min
                    : "0"
                  : "0"}
              </span>
            </p>

            <p className="flex py-2">
              <span className="w-44 text-gray-500">Final Blows</span>
              <span>
                {props.heroStats[1].average
                  ? props.heroStats[1].average.finalBlowsAvgPer10Min
                    ? props.heroStats[1].average.finalBlowsAvgPer10Min
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Damage</span>
              <span>
                {props.heroStats[1].average
                  ? props.heroStats[1].average.allDamageDoneAvgPer10Min
                    ? props.heroStats[1].average.allDamageDoneAvgPer10Min.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Healing</span>
              <span>
                {props.heroStats[1].average
                  ? props.heroStats[1].average.healingDoneAvgPer10Min
                    ? props.heroStats[1].average.healingDoneAvgPer10Min.toLocaleString()
                    : "0"
                  : "0"}
              </span>
            </p>
            <p className="flex py-2">
              <span className="w-44 text-gray-500">Deaths</span>
              <span>
                {props.heroStats[1].average
                  ? props.heroStats[1].average.deathsAvgPer10Min
                    ? props.heroStats[1].average.deathsAvgPer10Min
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
