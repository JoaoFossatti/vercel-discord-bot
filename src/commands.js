const { products, buildVipEmbed } = require('./utils');

function getApplicationCommands() {
  return [
    {
      name: 'ping',
      description: 'Testa se o bot está online'
    },
    {
      name: 'doacoes',
      description: 'Mostra as opções de doações com QR Code'
    },
    {
      name: 'vip1',
      description: 'Mostra os benefícios do VIP AllTheModium'
    },
    {
      name: 'vip2',
      description: 'Mostra os benefícios do VIP Vibranium'
    },
    {
      name: 'vip3',
      description: 'Mostra os benefícios do VIP Unobtainium'
    },
    {
      name: 'vip4',
      description: 'Mostra os benefícios do VIP Apex'
    }
  ];
}

function commandResponse(name) {
  if (name === 'ping') {
    return { content: 'Pong! Bot online.' };
  }

  if (name === 'doacoes') {
    const product = products.find((item) => item.id === 'doacoes');
    return {
      embeds: [buildVipEmbed(product)],
      components: [
        {
          type: 1,
          components: [
            {
              type: 2,
              style: 3,
              custom_id: 'buy_doacoes',
              label: 'Doar'
            }
          ]
        }
      ]
    };
  }

  const map = {
    vip1: 'vip_allthemodium',
    vip2: 'vip_vibranium',
    vip3: 'vip_unobtainium',
    vip4: 'vip_apex'
  };

  const productId = map[name];
  const product = products.find((item) => item.id === productId);
  if (!product) {
    return { content: 'Produto não encontrado.' };
  }

  return {
    embeds: [buildVipEmbed(product)],
    components: [
      {
        type: 1,
        components: [
          {
            type: 2,
            style: 3,
            custom_id: `buy_${product.id}`,
            label: 'Comprar'
          }
        ]
      }
    ]
  };
}

module.exports = { getApplicationCommands, commandResponse };
