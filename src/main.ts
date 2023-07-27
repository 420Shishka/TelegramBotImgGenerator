import { Telegraf } from 'telegraf';
import 'dotenv/config';

const BOT_TOKEN = process.env.BOT_TOKEN as string;
const API_BASE_URL = process.env.API_BASE_URL as string;
const API_TOKEN = process.env.API_TOKEN as string

const bootstrap = async () => {
  const bot = new Telegraf(BOT_TOKEN);
  const url = API_BASE_URL + `/search/photos/?client_id=${API_TOKEN}`;

  bot.start((ctx) => {
    ctx.reply('Hello!');
  });

  bot.on('message', async (ctx) => {
    const message = ctx.message as any;
    const input = message.text;

    const response = await fetch(url + `&query=${input}&per_page=3`);
    const data = await response.json();

    const media = data.results.map((item: any) => {
      return {
        type: 'photo',
        media: {
          url: item.urls.regular
        },
      }
    });

    await ctx.replyWithMediaGroup(media);
  })

  await bot.launch();
}

bootstrap().catch(console.error);