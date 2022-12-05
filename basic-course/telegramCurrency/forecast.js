const axios = require("axios");

require("dotenv").config();

const API_KEY = process.env.FORECAST_API_KEY;

const citiesCoords = {
  Київ: { lat: 50.45, lon: 30.542 },
  Львів: { lat: 49.843, lon: 24.0311 },
  Дніпро: { lat: 48.45, lon: 34.9833 },
  Маріуполь: { lat: 47.09, lon: 37.5413 },
  Одеса: { lat: 46.47, lon: 30.7326 },
};

function fromKelvin(tempKelvin) {
  return Math.round(tempKelvin - 273.15);
}
function getWeather(city, skipEven) {
  const link = "https://api.openweathermap.org/data/2.5/forecast";
  const params = {
    lat: citiesCoords[city].lat,
    lon: citiesCoords[city].lon,
    appid: API_KEY,
  };
  return axios.get(link, { params: params }).then((res) => {
    let result = `<strong>Погода у місті ${city}</strong>\n\n`;
    let weathers = {};
    res.data.list.forEach((w) => {
      const [date, time] = w.dt_txt.split(" ");
      const weatherObj = {
        time: time.substr(0, 5),
        temp: fromKelvin(w.main.temp_min),
        feelsLike: fromKelvin(w.main.feels_like),
        weather: w.weather[0].main.toLowerCase(),
      };
      if (weathers[date]) {
        weathers[date].push(weatherObj);
      } else {
        weathers[date] = [weatherObj];
      }
    });
    Object.keys(weathers).forEach((date) => {
      result += prettifyDate(date) + "\n";
      weathers[date].forEach((weatherData, index) => {
        if (index % 2 === 0 || !skipEven) {
          result +=
            `    ${weatherData.time}, ` +
            "\t" +
            `${weatherData.temp} °C, ` +
            "\t" +
            `відчувається як ${weatherData.feelsLike} °C, ` +
            "\t" +
            `${weatherData.weather}` +
            "\n";
        }
      });
    });
    return result;
  });
}

function prettifyDate(dateStr) {
  const date = new Date(dateStr);
  return (
    date.toLocaleString("en-us", { weekday: "long" }) +
    ", " +
    date.toLocaleString("en-us", { month: "long" }) +
    " " +
    date.getDate() +
    ":"
  );
}

const forecast = (bot, mainKeyboard = null) => {
  bot.onText(/(\/forecast|Прогноз погоди)/, (msg) => {
    const cities = Object.keys(citiesCoords).map((city) => {
      return [
        {
          text: city,
        },
      ];
    });
    cities.push([{ text: "Повернутися до головного меню" }]);

    const options = {
      reply_markup: JSON.stringify({
        keyboard: cities,
      }),
    };
    bot.sendMessage(msg.chat.id, "Оберіть місто", options);

    const cityRegex = new RegExp(`^${Object.keys(citiesCoords).join("|")}$`);
    bot.onText(cityRegex, (cityMsg) => {
      bot.sendMessage(msg.chat.id, "З яким інтервалом мені показати погоду?", {
        reply_markup: JSON.stringify({
          keyboard: [
            [{ text: "Кожні 3 години" }],
            [{ text: "Кожні 6 годин" }],
            [{ text: "Повернутися до головного меню" }],
          ],
        }),
      });
      bot.onText(/^Кожні 3 години|Кожні 6 годин$/, (intervalMsg) => {
        const skipEven = intervalMsg.text === "Кожні 6 годин";
        getWeather(cityMsg.text, skipEven).then((res) => {
          bot.sendMessage(msg.chat.id, res, {
            reply_markup: JSON.stringify(
              mainKeyboard
                ? mainKeyboard
                : {
                    hide_keyboard: true,
                  }
            ),
            parse_mode: "HTML",
          });
        });
        bot.removeTextListener(/^Кожні 3 години|Кожні 6 годин$/);
      });
      bot.removeTextListener(cityRegex);
    });
  });
};

module.exports = forecast;
