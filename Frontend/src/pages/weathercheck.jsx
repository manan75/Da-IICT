import { useEffect, useState } from "react";

export default function WeatherCard({ latitude = 52.52, longitude = 13.41 }) {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data.current_weather));
  }, [latitude, longitude]);

  if (!weather) {
    return (
      <div className="max-w-sm mx-auto p-4 bg-white shadow-lg rounded-2xl text-center">
        <p className="text-gray-500">Loading weather...</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm mx-auto p-6 bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg">
      <h2 className="text-lg font-semibold mb-2">Current Weather</h2>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="font-medium">🌡 Temperature</p>
          <p>{weather.temperature}°C</p>
        </div>
        <div>
          <p className="font-medium">💨 Wind Speed</p>
          <p>{weather.windspeed} km/h</p>
        </div>
        <div>
          <p className="font-medium">🧭 Wind Direction</p>
          <p>{weather.winddirection}°</p>
        </div>
        <div>
          <p className="font-medium">⏱ Time</p>
          <p>{weather.time}</p>
        </div>
      </div>
    </div>
  );
}
