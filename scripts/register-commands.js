const { getApplicationCommands } = require('../src/commands');

async function main() {
  const appId = process.env.DISCORD_APPLICATION_ID;
  const token = process.env.DISCORD_BOT_TOKEN;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!appId || !token || !guildId) {
    throw new Error('Defina DISCORD_APPLICATION_ID, DISCORD_BOT_TOKEN e DISCORD_GUILD_ID antes de registrar os comandos.');
  }

  const response = await fetch(`https://discord.com/api/v10/applications/${appId}/guilds/${guildId}/commands`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bot ${token}`
    },
    body: JSON.stringify(getApplicationCommands())
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Erro ao registrar comandos: ${response.status} ${text}`);
  }

  console.log('Comandos registrados com sucesso.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
