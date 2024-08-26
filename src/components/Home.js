import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import sunny from "../image/sunny.png";
import cloudy from "../image/cloudy.png";
import brokenCloud from "../image/brokenCloud.png";
import rainy from "../image/rainy.png";

function Home() {
  // const [url, setUrl] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [Timer, setTimer] = useState("");
  const [curLoc, setcurLoc] = useState("");

  const [loc, setLoc] = useState("");
  const [Time, setTime] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=b7211f1223b756b5e9538b6cdd0bb84d`
      )
        .then((res) => res.json())
        .then((data) => {
          setcurLoc(data.name);
          setLoc(data.name);
        });
      fetch(
        `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`
      )
        .then((res) => res.json())
        .then((data) => {
          setTime(data.time);
        });
    }, showError);
  }, [Time]);

  const showError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        break;
    }
  };

  const addCity = (loc) => {
    setLoc(loc);
  };

  const Search = async (loc) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=metric&appid=b7211f1223b756b5e9538b6cdd0bb84d`
      );
      const data = await response.json();
      setWeatherData({
        lat: data.coord.lat,
        lon: data.coord.lon,
        temp: Math.ceil(data.main.temp),
        city: data.name,
        max: Math.ceil(data.main.temp_max),
        min: Math.ceil(data.main.temp_min),
        country: data.sys.country,
        desc: data.weather[0].main,
        wind: Math.ceil(data.wind.speed),
        humidity: data.main.humidity,
        icn: data.weather[0].icon,
        sunrise: data.sys.sunrise,
        sunset: data.sys.sunset,
        pressure: data.main.pressure,
        visibility: Math.ceil(data.visibility / 1000),
        feels_like: Math.ceil(data.main.feels_like),
        img:
          "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png",
      });
    } catch (error) {} // const timeSearch = async (lat, lon) => {
    //   try {
    //     const response = await fetch(
    //       `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`
    //     );
    //     const data = await response.json();
    //     setTime(data.time);
    //   } catch (error) {}
    // };
  };

  // const timeSearch = async (lat, lon) => {
  //   try {
  //     const response = await fetch(
  //       `https://timeapi.io/api/time/current/coordinate?latitude=${lat}&longitude=${lon}`
  //     );
  //     const data = await response.json();
  //     setTime(data.time);
  //   } catch (error) {}
  // };

  useEffect(() => {
    // timeSearch(weatherData.lat, weatherData.lon);
    Search(loc);
  }, [loc, weatherData.lat, weatherData.lon]);

  // console.log(Time);

  const time = new Date().toLocaleTimeString();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(time);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);
  var hour = (Timer.slice(0, 2) % 12).toString().padStart(2, "0");
  // eslint-disable-next-line no-redeclare
  var hour = hour==0? "12": hour;
  var minute = Timer.slice(3, 5);
  var ampm = Timer.slice(0, 2) >= 12 ? "PM" : "AM";
  //day and date
  const date = new Date().getDate();
  const month = new Date().toLocaleString("default", { month: "short" });
  const day = new Date().toLocaleString("default", { weekday: "long" });

  const sunRise = new Date(weatherData.sunrise * 1000)
    .toLocaleTimeString()
    .slice(0, 5);

  const sunSet = new Date((weatherData.sunset + 86400000) * 1000)
    .toLocaleTimeString()
    .slice(0, 5);

  return (
    <div className="body p-4">
      <Navbar addCity={addCity} />
      {/* {console.log(weatherData.lon, weatherData.lat)} */}

      <div className="container mt-5 text-light">
        <div className="row  ">
          <div className="col-md-4 me-5 p-1 dateTime-div">
            <h2 className="text-center fa-3x">{curLoc}</h2>
            <div className="row text-center ">
              <h1 className="fa-2x mt-3 ">
                <span className="fa-3x">{hour + ":" + minute}</span> {ampm}
              </h1>
              <h3>
                <span className="">{day + ", " + date + " " + month}</span>
              </h3>
            </div>
          </div>
          <div className="col-md dateTime-div">
            <div className="row">
              <div className="col-md text-center p-3">
                <div className="row">
                  <h2 className="fa-3x">{weatherData.temp}°C</h2>
                  <span className="">
                    Feels like: {weatherData.feels_like}°C
                  </span>
                </div>
                <div className="row mt-2 px-2">
                  <i className="fi icn m-3 fi-ss-sunrise-alt ">
                    <span className=""> Sunrises {sunRise}</span>
                  </i>
                  <i className="fi m-3 icn fi-ss-sunset ">
                    <span> Sunset {sunSet}</span>
                  </i>
                </div>
              </div>
              <div className="col-md text-center">
                <h2 className="text-center fa-3x">{weatherData.city}</h2>
                <img src={weatherData.img} alt="" className="icon h-50 w-75" />
                <h2 className="fa-2x mt-5text-capitalize">
                  {weatherData.desc}
                </h2>
              </div>

              <div className="col-md text-center mt-4">
                <div className="row">
                  <div className="col-md-6 mt-3">
                    <h2 className="fa-2x">
                      <i className="fi fi-ss-water"></i>
                    </h2>
                    <h4 className="text-center">{weatherData.humidity}%</h4>
                    <h6 className="text-center">Humidity</h6>
                  </div>
                  <div className="col-md-6 mt-3">
                    <h2 className="fa-2x">
                      <i className="fi fi-ss-wind"></i>
                    </h2>
                    <h4 className="text-center">{weatherData.wind}km/h</h4>
                    <h6 className="text-center">Speed</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mt-4">
                    <h2>
                      <i className="fi fi-ss-tachometer"></i>
                    </h2>
                    <h4 className="text-center">{weatherData.pressure}Pa</h4>
                    <h6 className="text-center">Pressure</h6>
                  </div>
                  <div className="col-md-6 mt-4">
                    <h2>
                      <i className="fi fi-ss-eye"></i>
                    </h2>
                    <h4 className="text-center">{weatherData.visibility}km</h4>
                    <h6 className="text-center">Visibility</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
