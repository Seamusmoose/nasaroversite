import React, { useState, useEffect } from "react";
import axios from "axios";

const MarsWeather = () => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const { data } = await axios.get("/weather");
      setWeatherData(data);
    };

    fetchWeatherData();
  }, []);

  let test = [];

  weatherData.forEach((item) => {
    test.push([...Object.entries(item)]);
  });

  return (
    <div>
      <h1>Last recorded Mars Weather with Curiosty Rover</h1>
      <div className="weather">
        {weatherData.length === 0 ? (
          <h1>...Loading</h1>
        ) : (
          test.map((item, i) => {
            return (
              <div key={i}>
                <div className="items">
                  <h3>{item[0].join(": ")}</h3>
                  <h3>{item[1].join(": ")}</h3>
                  <h3>{item[2].join(": ")}</h3>
                  <h3>{item[3].join(": ")}</h3>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MarsWeather;
