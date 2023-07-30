import { Context } from 'telegraf';
import { MediaGroup } from 'telegraf/typings/telegram-types';

import { UnsplashApiClient } from '../classes/UnsplashApiClient';

type ActionContext = Context & {
  match: RegExpExecArray;
}

const handleAction = async (ctx: ActionContext) => {
  const [action] = ctx.match;
  const [actionName, actionRawData] = action.split('|');

  if (actionName !== 'countSelected') {
    return;
  }

  const { input, count } = JSON.parse(actionRawData);
  const images = await UnsplashApiClient.searchImages(input, count);

  const media = images.results.map(({ urls: { regular } }) => {
    return {
      type: 'photo',
      media: { url: regular },
    }
  });

  await ctx.replyWithMediaGroup(media as MediaGroup);
}

export { handleAction };