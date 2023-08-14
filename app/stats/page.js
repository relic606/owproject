"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [data, setData] = useState(null);
  const [profile, setProfile] = useState("Relic-1203");

  const [inputFieldBt, setInputFieldBt] = useState("");
  const [inputFieldId, setInputFieldId] = useState("");

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
    fetch(`https://ow-api.com/v1/stats/pc/us/${profile}/complete/`)
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
            <img src={data.icon} className="mx-8"></img>
            <div>
              <p className="text-2xl font-bold">{data.name}</p>
              <p>Games Played - {data.gamesPlayed}</p>
              <p>Won - {data.gamesWon}</p>
              <p>Lost - {data.gamesLost}</p>
            </div>
          </div>
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      );
    }
  }
}
