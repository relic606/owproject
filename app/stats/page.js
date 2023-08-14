"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState("Relic-1203");

  const [inputField, setInputField] = useState();

  const inputsHandler = (e) => {
    setInputField({ [e.target.name]: e.target.value });
  };

  const submitButton = () => {
    alert(inputField.first_name);
  };

  useEffect(() => {
    fetch(`https://ow-api.com/v1/stats/pc/us/${profile}/complete/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!data) {
    return <p>No profile data</p>;
  } else {
    return (
      <div>
        {/* <input
          type="text"
          name="first_name"
          onChange={inputsHandler}
          placeholder="Battletag"
          value={inputField.first_name}
        />

        <button onClick={submitButton}>Submit Now</button> */}
        <p>{data.name}</p>
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      </div>
    );
  }
}
