// tg bot link: "https://t.me/EchoConsoleBot"
//tg bot nickname: @EchoConsoleBot

const TgBot = require("node-telegram-bot-api");
const axios = require("axios");

require("dotenv").config();
const bot = new TgBot(process.env.BOT_TOKEN, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Начальное приветствие" },
]);
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (msg.text === "/start") {
    bot.sendMessage(
      chatId,
      `Добрый день, я предназначен для того, чтобы повторять ваши мысли и давать вам рандомные фото. Приятного использования!`
    );
  } else if (msg.text !== "photo") {
    bot.sendMessage(chatId, `Вы прислали мне: ${msg.text} `);
  }
  console.log(`Пользователь написал: ${msg.text}`);
});

bot.onText(/photo/, (msg) => {
  const chatId = msg.chat.id;
  axios.get("https://picsum.photos/200/300").then((response) => {
    bot.sendPhoto(chatId, response.request.res.responseUrl);
  });
});
