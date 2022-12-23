// tg bot link: "https://t.me/ConverterAndForecastBot"
//tg bot nickname: @ConverterAndForecastBot

const TgBot = require("node-telegram-bot-api");
const currency = require("./currency");
const forecast = require("./forecast");

require("dotenv").config();

const mainKeyboard = {
  keyboard: [[{ text: "Прогноз погоди" }], [{ text: "Курс валюти" }]],
};

const bot = new TgBot(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
  { command: "start", description: "Розпочати роботу з ботом." },
  {
    command: "forecast",
    description: "Отримати прогноз погоди у вашому місті.",
  },
  { command: "rates", description: "Отримати курс валюти до UAH" },
]);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `Привіт, мене звати КурсоБот. З моєю допомогою ти можеш дізнатися про погоду у своєму місті, а також курс валют за головними банками України.`,
    {
      reply_markup: JSON.stringify(mainKeyboard),
    }
  );
});

bot.onText(/(Повернутися до головного меню)/, (msg) => {
  bot.sendMessage(msg.chat.id, "Оберіть опцію", {
    reply_markup: JSON.stringify(mainKeyboard),
  });
});
forecast(bot, mainKeyboard);
currency(bot, mainKeyboard);
