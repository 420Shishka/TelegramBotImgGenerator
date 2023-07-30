import { Telegraf } from 'telegraf';
import 'dotenv/config';

import {
  handleStart,
  handleMessage,
  handleAction
} from './events';

const BOT_TOKEN = process.env.BOT_TOKEN as string;

const bootstrap = async () => {
  const bot = new Telegraf(BOT_TOKEN);

  bot.start(handleStart);
  bot.on('message', handleMessage);
  bot.action(/.+/, handleAction);

  await bot.launch();
}

bootstrap().catch(console.error);