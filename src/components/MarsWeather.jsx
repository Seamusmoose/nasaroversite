import React, { useState, useEffect } from "react";
import axios from "axios";

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  // useEffect(() => {
  //   fetch("/weather")
  //     .then((res) => {
  //       if (res.ok) return res.json();
  //     })
  //     .then((jsonRes) => setWeatherData(jsonRes));
  // }, []);

  // const weatherURL = `https://api.maas2.apollorion.com/`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      const { data } = await axios.get("/weather");
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  // console.log(weatherData, "weatherdata");
  return (
    <div>
      <h1>Last recorded Mars Weather with Curiosty Rover</h1>
      <div>
        {weatherData.length === 0 ? (
          <h1>...Loading</h1>
        ) : (
          weatherData.map((data, i) => {
            console.log(data, i);
            // return Object.values(data).map((w, i) => {
            //   console.log(w);
            //   return (
            //     <ul key={w}>
            //       <li>{w}</li>
            //     </ul>
            //   );
            // });
          })
        )}
      </div>
    </div>
  );
};

export default MarsWeather;
