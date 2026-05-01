const products = require('./data/products.json');

function formatBRL(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

function getProductById(id) {
  return products.find((product) => product.id === id);
}

function buildVipEmbed(product) {
  return {
    title: product.nome,
    description: `${product.descricao.join('\n')}\n\nPreço: ${product.preco > 0 ? formatBRL(product.preco) : 'Escolha o valor'} (${product.duracao})`,
    color: 0x57f287,
    footer: { text: 'CraftPro Network' }
  };
}

function buildQrEmbed(product, baseUrl) {
  const qrUrl = `${baseUrl}${product.qrImage}`;
  const valor = product.preco > 0 ? formatBRL(product.preco) : '1 / 5 / 10 reais';

  return {
    title: `Pagamento via Pix: ${product.nome}`,
    description: `Escaneie o QR Code abaixo para pagar.\n\nValor: ${valor}\n\nDepois do pagamento, envie o comprovante manualmente para a moderação do servidor.`,
    color: 0x2ecc71,
    image: { url: qrUrl },
    footer: { text: 'CraftPro Network • Pix' }
  };
}

module.exports = {
  products,
  formatBRL,
  getProductById,
  buildVipEmbed,
  buildQrEmbed
};
