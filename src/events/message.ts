import { Context } from 'telegraf';

const ACTION_NAME = 'countSelected';
const ACTION_SEPARATOR = '|';

const getCallbackData = (input: string, count: number) => {
  const data = JSON.stringify({ input, count });

  return ACTION_NAME + ACTION_SEPARATOR + data;
}

const getKeyboardMarkup = (input: string) => {
  return [
    [
      { text: '1', callback_data: getCallbackData(input, 1) },
      { text: '3', callback_data: getCallbackData(input, 3) },
    ],
    [
      { text: '5', callback_data: getCallbackData(input, 5) },
      { text: '10', callback_data: getCallbackData(input, 10) },
    ]
  ]
}

const handleMessage = async (ctx: Context) => {
  const message = ctx.message as any;
  const input = message.text;

  await ctx.reply('How many images do you want?', {
    reply_markup: {
      inline_keyboard: getKeyboardMarkup(input),
    }
  });
}

export { handleMessage };