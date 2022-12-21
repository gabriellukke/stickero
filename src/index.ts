import { create, decryptMedia } from '@open-wa/wa-automate';

create().then((client) => start(client));

function start(client) {
  client.onMessage(async (message) => {
    console.log(message);
    const { quotedMsg, isMedia, isGroupMsg, mimetype, from } = message;
    const isQuotedImage = quotedMsg && quotedMsg.type === 'image';
    if (isGroupMsg === false) { 
      const encryptMedia = isQuotedImage ? quotedMsg : message
      console.log(encryptMedia);
      const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
      console.log(_mimetype);
      const mediaData = await decryptMedia(encryptMedia)
      console.log(mediaData);
      const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
      client.sendImageAsSticker(from, imageBase64).then(() => {
        client.reply(from, 'Aqui está seu sticker')
      })
    }
  });
}

