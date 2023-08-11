"use client";

import { useEffect, useState } from "react";

export default function Stats() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [profile, setProfile] = useState("Relic-1203");

  useEffect(() => {
    fetch(`https://ow-api.com/v1/stats/pc/us/${profile}/complete/`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [profile]);

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (!data) {
    return <p>No profile data</p>;
  } else {
    
    console.log(data);
    return <div>{data.name}</div>;
  }
}
