// temp.js
// ❌ remove: import fetch from "node-fetch";

const STATION_ID = "8729108"; // Miami Beach station

async function getNoaaData() {
  try {
    const pressureUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=air_pressure&date=latest&station=${STATION_ID}&units=metric&time_zone=gmt&format=json`;
    const pressureRes = await fetch(pressureUrl);
    const pressureData = await pressureRes.json();
    const pressure = parseFloat(pressureData.data[0].v);

    const windUrl = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=wind&date=latest&station=${STATION_ID}&units=metric&time_zone=gmt&format=json`;
    const windRes = await fetch(windUrl);
    const windData = await windRes.json();
    const windSpeed = parseFloat(windData.data[0].s);
    const windDir = parseFloat(windData.data[0].d);

    console.log("🌊 NOAA Coastal Data:");
    console.log(`Air Pressure: ${pressure} hPa`);
    console.log(`Wind Speed: ${windSpeed} m/s, Direction: ${windDir}°`);

    if (windSpeed > 18 && pressure < 1000) {
      console.log("⚠️ ALERT: Cyclone-like conditions detected!");
    } else {
      console.log("✅ Conditions normal.");
    }

  } catch (err) {
    console.error("Error fetching NOAA data:", err);
  }
}

getNoaaData();
