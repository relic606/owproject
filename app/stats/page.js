"use client";

import { useEffect, useState } from "react";

export default function Stats() {
	const [data, setData] = useState(null);
	const [profile, setProfile] = useState("Relic-1203");

	const [inputFieldBt, setInputFieldBt] = useState("");
	const [inputFieldId, setInputFieldId] = useState("");

	const [selectedHero, setSelectedHero] = useState("ana");
	const [heroStats, setHeroStats] = useState("");

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

	useEffect(() => {
		fetch(`https://ow-api.com/v1/stats/pc/us/${profile}/complete`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				setData(data);
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
						<img src={data.icon} className="mx-8" alt=""></img>
						<div>
							<p className="text-2xl font-bold">{data.name}</p>
							<p>Games Played - {data.gamesPlayed}</p>
							<p>Won - {data.gamesWon}</p>
							<p>Lost - {data.gamesLost}</p>
						</div>
					</div>
					<div>
						Quickplay Stats
						<div className="flex p-4">
							<div>
								Totals
								<p>
									Time Played-
									{data.quickPlayStats.careerStats.allHeroes.game.timePlayed}
								</p>
								<p>
									Eliminations-
									{
										data.quickPlayStats.careerStats.allHeroes.combat
											.eliminations
									}
								</p>
								<p>
									Final Blows-
									{data.quickPlayStats.careerStats.allHeroes.combat.finalBlows}
								</p>
								<p>
									Damage-
									{data.quickPlayStats.careerStats.allHeroes.combat.damageDone}
								</p>
								<p>
									Healing-
									{
										data.quickPlayStats.careerStats.allHeroes.assists
											.healingDone
									}
								</p>
								<p>
									Offensive Assists-
									{
										data.quickPlayStats.careerStats.allHeroes.assists
											.offensiveAssists
									}
								</p>
								<p>
									Defensive Assists-
									{
										data.quickPlayStats.careerStats.allHeroes.assists
											.defensiveAssists
									}
								</p>
								<p>
									Deaths-
									{data.quickPlayStats.careerStats.allHeroes.combat.deaths}
								</p>
							</div>
							<div className="p-4">
								Personal Match Records
								<p>
									Damage-
									{
										data.quickPlayStats.careerStats.allHeroes.best
											.allDamageDoneMostInGame
									}
								</p>
								<p>
									Eliminations-
									{
										data.quickPlayStats.careerStats.allHeroes.best
											.eliminationsMostInGame
									}
								</p>
								<p>
									Kill Streak-
									{
										data.quickPlayStats.careerStats.allHeroes.best
											.killsStreakBest
									}
								</p>
								<p>
									Healing-
									{
										data.quickPlayStats.careerStats.allHeroes.best
											.healingDoneMostInGame
									}
								</p>
							</div>
						</div>
						<div>
							<p>Ana</p>
							<div className="flex">
								<div>
									Totals
									<p>
										Time Played-
										{data.quickPlayStats.careerStats.ana.game.timePlayed}
									</p>
									<p>
										Win Percentage -
										{data.quickPlayStats.careerStats.ana.game.winPercentage}
									</p>
									<p>
										Eliminations -
										{data.quickPlayStats.careerStats.ana.combat.eliminations}
									</p>
									<p>
										Final Blows -
										{data.quickPlayStats.careerStats.ana.combat.finalBlows}
									</p>
									<p>
										Damage -
										{data.quickPlayStats.careerStats.ana.combat.damageDone}
									</p>
									<p>
										Support only Offensive Assists -
										{
											data.quickPlayStats.careerStats.ana.assists
												.offensiveAssists
										}
									</p>
									<p>
										support only Defensive Assists -
										{
											data.quickPlayStats.careerStats.ana.assists
												.defensiveAssists
										}
									</p>
									<p>
										Healing -
										{data.quickPlayStats.careerStats.ana.assists.healingDone}
									</p>
									<p>
										Deaths -{data.quickPlayStats.careerStats.ana.combat.deaths}
									</p>
								</div>
								<div>
									Personal Match Records
									<p>
										Eliminations-
										{
											data.quickPlayStats.careerStats.ana.best
												.eliminationsMostInGame
										}
									</p>
									<p>
										Final Blows-
										{
											data.quickPlayStats.careerStats.ana.best
												.finalBlowsMostInGame
										}
									</p>
									<p>
										Kill Streak-
										{data.quickPlayStats.careerStats.ana.best.killsStreakBest}
									</p>
									<p>
										Damage-
										{
											data.quickPlayStats.careerStats.ana.best
												.allDamageDoneMostInGame
										}
									</p>
									<p>
										Healing-
										{
											data.quickPlayStats.careerStats.ana.assists
												.healingDoneMostInGame
										}
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
