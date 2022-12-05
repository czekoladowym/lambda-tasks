const axios = require("axios");

const currency = (bot, mainKeyboard = null) => {
  bot.onText(/(\/rates|Курс валюти)/, (msg) => {
    const options = {
      reply_markup: JSON.stringify({
        keyboard: [
          [{ text: "USD" }],
          [{ text: "EUR" }],
          [{ text: "Повернутися до головного меню" }],
        ],
      }),
    };
    bot.sendMessage(msg.chat.id, "Оберіть валюту", options);

    bot.onText(/(USD|EUR)/, (currencyMsg) => {
      axios
        .get("https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5")
        .then((result) => {
          const ratesData = result.data.find(
            (curr) => curr.ccy === currencyMsg.text
          );
          bot.sendMessage(
            msg.chat.id,

            `${ratesData.ccy} в UAH\n КУПІВЛЯ: ${ratesData.buy}\n ПРОДАЖ: ${ratesData.sale}`,
            {
              reply_markup: JSON.stringify(
                mainKeyboard
                  ? mainKeyboard
                  : {
                      hide_keyboard: true,
                    }
              ),
            }
          );
        });

      bot.removeTextListener(/(USD|EUR)/);
    });
  });
};
module.exports = currency;
