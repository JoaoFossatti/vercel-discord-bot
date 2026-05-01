const { InteractionType, InteractionResponseType, verifyKey } = require('discord-interactions');
const { commandResponse } = require('../src/commands');
const { getProductById, buildQrEmbed } = require('../src/utils');

function rawBody(req) {
  if (typeof req.body === 'string') return req.body;
  return JSON.stringify(req.body || {});
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const signature = req.headers['x-signature-ed25519'];
  const timestamp = req.headers['x-signature-timestamp'];
  const body = rawBody(req);
  const publicKey = process.env.DISCORD_PUBLIC_KEY;

  const isValid = verifyKey(body, signature, timestamp, publicKey);
  if (!isValid) {
    return res.status(401).json({ error: 'Bad request signature' });
  }

  const interaction = typeof req.body === 'object' ? req.body : JSON.parse(body);

  if (interaction.type === InteractionType.PING) {
    return res.status(200).json({ type: InteractionResponseType.PONG });
  }

  if (interaction.type === InteractionType.APPLICATION_COMMAND) {
    const data = commandResponse(interaction.data.name);
    return res.status(200).json({
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data
    });
  }

  if (interaction.type === InteractionType.MESSAGE_COMPONENT) {
    const customId = interaction.data.custom_id;

    if (customId.startsWith('buy_')) {
      const productId = customId.replace('buy_', '');
      const product = getProductById(productId);

      if (!product) {
        return res.status(200).json({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: { content: 'Produto não encontrado.', flags: 64 }
        });
      }

      const baseUrl = process.env.BOT_BASE_URL;
      return res.status(200).json({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          embeds: [buildQrEmbed(product, baseUrl)],
          flags: 64
        }
      });
    }
  }

  return res.status(200).json({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: 'Interação não suportada ainda.',
      flags: 64
    }
  });
};
