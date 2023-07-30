import { Context } from 'telegraf';

const handleStart = (ctx: Context) => {
  ctx.reply('Type search term to get images');
}

export { handleStart };