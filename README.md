# Discord bot para Vercel

Esta versão foi adaptada para funcionar na Vercel usando **Discord Interactions via webhook**, em vez de `client.login()` com conexão persistente.

## O que funciona nesta versão
- Slash commands `/ping`, `/doacoes`, `/vip1`, `/vip2`, `/vip3`, `/vip4`
- Botões de comprar
- Resposta com QR Code Pix em mensagem privada/ephemeral
- Projeto simples de editar depois

## Limitação importante
Como a Vercel usa funções serverless, esta versão **não fica ouvindo mensagens em tempo real** como o seu código antigo fazia com `MessageCreate`. Por isso, o fluxo automático de “esperar comprovante no chat e encaminhar para moderação” foi removido e substituído por uma instrução manual no embed.

## Estrutura
- `api/interactions.js`: endpoint principal para Discord Interactions
- `src/data/products.json`: produtos editáveis
- `src/utils.js`: utilitários
- `src/commands.js`: definição dos comandos
- `public/assets/`: QR Codes e imagens públicas
- `scripts/register-commands.js`: registra os slash commands

## Variáveis
Copie `.env.example` para `.env` localmente e configure também na Vercel:
- `DISCORD_APPLICATION_ID`
- `DISCORD_PUBLIC_KEY`
- `BOT_BASE_URL`
- `DISCORD_BOT_TOKEN` (apenas para registrar comandos)
- `DISCORD_GUILD_ID` (apenas para registrar comandos em teste)

## Como publicar
1. Suba esta pasta para o GitHub.
2. Importe o projeto na Vercel.
3. Configure as variáveis de ambiente.
4. Depois do deploy, use a URL final e coloque `/api/interactions` no campo **Interactions Endpoint URL** do Discord Developer Portal.
5. Rode `node scripts/register-commands.js` localmente para registrar os comandos.

## Onde editar
- VIPs e preços: `src/data/products.json`
- Textos dos comandos: `src/commands.js`
- Layout da resposta Pix: `src/utils.js`
- Endpoint do bot: `api/interactions.js`
