import 'dotenv/config';
import { Conversation, TelegramClient } from '@mtcute/node';

const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_STORAGE = 'telegram-e2e.session';
const DEFAULT_INVALID_LEAGUE_ID = '0';
const DEFAULT_INVALID_REPLY_FRAGMENT = 'Лига не найдена';
const DEFAULT_PRIVATE_INFO_FRAGMENTS = ['🇷🇺', '📅'];
const DEFAULT_LEAGUE_FRAGMENTS = ['📊', '👥 Команд:', '⏳'];
const DEFAULT_VALID_BUTTON_LABEL = 'Посмотреть Лигу';

const HELP_TEXT = `
Usage:
  npm run test:e2e:telegram:mtcute

Required env:
  TELEGRAM_E2E_API_ID
  TELEGRAM_E2E_API_HASH
  TELEGRAM_E2E_BOT_USERNAME
  TELEGRAM_E2E_GROUP_CHAT_ID
  TELEGRAM_E2E_VALID_LEAGUE_ID

Optional env:
  TELEGRAM_E2E_TEST_MODE=true
  TELEGRAM_E2E_STORAGE=telegram-e2e.session
  TELEGRAM_E2E_PHONE=+79991234567
  TELEGRAM_E2E_PASSWORD=your_2fa_password
  TELEGRAM_E2E_TIMEOUT_MS=30000
  TELEGRAM_E2E_INVALID_LEAGUE_ID=0
  TELEGRAM_E2E_INVALID_REPLY_FRAGMENT=Лига не найдена

Notes:
  - The script uses an MTProto user session, not the bot token.
  - On the first run it asks for the login code unless a valid session
    already exists in TELEGRAM_E2E_STORAGE.
  - The script targets Telegram test servers by default.
`.trim();

function parseBoolean(value, defaultValue = false) {
  if (value === undefined) {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(value ?? '', 10);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return parsed;
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function stripAtSign(value) {
  return value.replace(/^@/, '');
}

function normalizePeer(value) {
  if (/^-?\d+$/.test(value)) {
    return Number.parseInt(value, 10);
  }

  return value;
}

function formatGroupCommand(command, botUsername) {
  if (!command.startsWith('/')) {
    return command;
  }

  const [head, ...rest] = command.split(' ');
  const scopedHead = `${head}@${botUsername}`;

  if (rest.length === 0) {
    return scopedHead;
  }

  return `${scopedHead} ${rest.join(' ')}`;
}

function isMessageFromBot(message, botUsername) {
  return stripAtSign(message.sender?.username ?? '') === botUsername;
}

function findButtonByText(markup, text) {
  if (!markup || markup.type !== 'inline') {
    return null;
  }

  for (const row of markup.buttons) {
    for (const button of row) {
      if (button.text === text) {
        return button;
      }
    }
  }

  return null;
}

function describeButton(button) {
  if (!button) {
    return '';
  }

  const url = button.url ? ` url=${button.url}` : '';
  return `${button._} text=${JSON.stringify(button.text)}${url}`;
}

function printScenarioResult(result) {
  const status = result.ok ? 'PASS' : 'FAIL';
  console.log(`\n[${status}] ${result.name}`);
  console.log(`  sent: ${result.sentCommand}`);

  if (result.replyText) {
    console.log(`  reply: ${JSON.stringify(result.replyText)}`);
  }

  if (result.buttonDescription) {
    console.log(`  button: ${result.buttonDescription}`);
  }

  if (result.failures.length > 0) {
    for (const failure of result.failures) {
      console.log(`  - ${failure}`);
    }
  }
}

function getConfig() {
  return {
    apiId: parseInteger(requiredEnv('TELEGRAM_E2E_API_ID')),
    apiHash: requiredEnv('TELEGRAM_E2E_API_HASH'),
    botUsername: stripAtSign(requiredEnv('TELEGRAM_E2E_BOT_USERNAME')),
    groupChatId: normalizePeer(requiredEnv('TELEGRAM_E2E_GROUP_CHAT_ID')),
    validLeagueId: requiredEnv('TELEGRAM_E2E_VALID_LEAGUE_ID'),
    invalidLeagueId:
      process.env.TELEGRAM_E2E_INVALID_LEAGUE_ID ?? DEFAULT_INVALID_LEAGUE_ID,
    invalidReplyFragment:
      process.env.TELEGRAM_E2E_INVALID_REPLY_FRAGMENT ??
      DEFAULT_INVALID_REPLY_FRAGMENT,
    storage: process.env.TELEGRAM_E2E_STORAGE ?? DEFAULT_STORAGE,
    timeoutMs: parseInteger(
      process.env.TELEGRAM_E2E_TIMEOUT_MS,
      DEFAULT_TIMEOUT_MS,
    ),
    testMode: parseBoolean(process.env.TELEGRAM_E2E_TEST_MODE, true),
  };
}

function getStartOptions(client) {
  return {
    phone: async () => process.env.TELEGRAM_E2E_PHONE ?? client.input('Phone > '),
    code: () => client.input('Code > '),
    password: async () =>
      process.env.TELEGRAM_E2E_PASSWORD ?? client.input('Password > '),
  };
}

function getScenarios(config) {
  return [
    {
      name: 'private chat: /info returns expected message',
      chat: config.botUsername,
      command: '/info',
      expectedFragments: DEFAULT_PRIVATE_INFO_FRAGMENTS,
    },
    {
      name: 'private chat: /league <valid> returns league info and webapp button',
      chat: config.botUsername,
      command: `/league ${config.validLeagueId}`,
      expectedFragments: DEFAULT_LEAGUE_FRAGMENTS,
      expectedButtonText: DEFAULT_VALID_BUTTON_LABEL,
      expectedButtonUrlFragment: config.validLeagueId,
    },
    {
      name: 'private chat: /league <invalid> returns friendly error',
      chat: config.botUsername,
      command: `/league ${config.invalidLeagueId}`,
      expectedFragments: [config.invalidReplyFragment],
    },
    {
      name: 'group chat: /info works in group',
      chat: config.groupChatId,
      command: formatGroupCommand('/info', config.botUsername),
      expectedFragments: DEFAULT_PRIVATE_INFO_FRAGMENTS,
    },
    {
      name: 'group chat: /league <valid> works in group',
      chat: config.groupChatId,
      command: formatGroupCommand(
        `/league ${config.validLeagueId}`,
        config.botUsername,
      ),
      expectedFragments: DEFAULT_LEAGUE_FRAGMENTS,
      expectedButtonText: DEFAULT_VALID_BUTTON_LABEL,
      expectedButtonUrlFragment: config.validLeagueId,
    },
    {
      name: 'group chat: /league <invalid> works in group',
      chat: config.groupChatId,
      command: formatGroupCommand(
        `/league ${config.invalidLeagueId}`,
        config.botUsername,
      ),
      expectedFragments: [config.invalidReplyFragment],
    },
  ];
}

async function runScenario(client, scenario, config) {
  const failures = [];
  const conversation = new Conversation(client, scenario.chat);

  return conversation.with(async () => {
    const sentMessage = await conversation.sendText(scenario.command);
    let replyMessage;

    try {
      replyMessage = await conversation.waitForResponse(
        message => isMessageFromBot(message, config.botUsername),
        {
          message: sentMessage.id,
          timeout: config.timeoutMs,
        },
      );
    } catch {
      failures.push(
        `No bot reply received within ${config.timeoutMs} ms. The bot likely did not answer this command.`,
      );

      return {
        name: scenario.name,
        ok: false,
        sentCommand: scenario.command,
        replyText: '',
        buttonDescription: '',
        failures,
      };
    }

    for (const fragment of scenario.expectedFragments) {
      if (!replyMessage.text.includes(fragment)) {
        failures.push(`Expected reply to include ${JSON.stringify(fragment)}.`);
      }
    }

    let buttonDescription = '';

    if (scenario.expectedButtonText) {
      const button = findButtonByText(replyMessage.markup, scenario.expectedButtonText);

      if (!button) {
        failures.push(
          `Expected inline button ${JSON.stringify(scenario.expectedButtonText)}.`,
        );
      } else {
        buttonDescription = describeButton(button);

        if (
          !button.url ||
          !String(button.url).includes(scenario.expectedButtonUrlFragment)
        ) {
          failures.push(
            `Expected button URL to include ${JSON.stringify(scenario.expectedButtonUrlFragment)}.`,
          );
        }
      }
    }

    return {
      name: scenario.name,
      ok: failures.length === 0,
      sentCommand: scenario.command,
      replyText: replyMessage.text,
      buttonDescription,
      failures,
    };
  });
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log(HELP_TEXT);
    return;
  }

  const config = getConfig();
  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: config.storage,
    testMode: config.testMode,
  });

  try {
    console.log(
      `Starting mtcute Telegram e2e probe (testMode=${String(config.testMode)}, storage=${config.storage})`,
    );

    const self = await client.start(getStartOptions(client));
    console.log(`Authorized as ${self.displayName}`);

    const results = [];

    for (const scenario of getScenarios(config)) {
      const result = await runScenario(client, scenario, config);
      results.push(result);
      printScenarioResult(result);
    }

    const failedCount = results.filter(result => !result.ok).length;
    console.log(
      `\nSummary: ${results.length - failedCount}/${results.length} scenarios passed.`,
    );

    if (failedCount > 0) {
      process.exitCode = 1;
    }
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
