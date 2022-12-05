const { Command } = require("commander");
const fs = require("fs");

require("dotenv").config();

const program = new Command();
const bot = new TgBot(process.env.BOT_TOKEN, {
  polling: true,
});

program
  .command("message")
  .description("Send message to Telegram Bot.")
  .argument("<string>", "message to send")
  .action((message) => {
    bot.sendMessage(process.env.CHAT_ID, message).then(() => {
      process.exit(0);
    });
  });

program
  .command("photo")
  .description(
    "Send photo to Telegram Bot. Just drag and drop it into console after p-flag."
  )
  .argument("<string>", "path to photo")
  .action((photoPath) => {
    fs.readFile(photoPath, (e, imageBuffer) => {
      bot.sendPhoto(process.env.CHAT_ID, imageBuffer).then(() => {
        process.exit(0);
      });
    });
  });

program.parse();
