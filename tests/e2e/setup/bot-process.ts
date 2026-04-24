import { spawn, type ChildProcessByStdio } from 'node:child_process';
import type { Readable } from 'node:stream';

const BOT_READY_LOG = 'API call: getUpdates';
const DEFAULT_TIMEOUT_MS = 30_000;

export interface BotProcessHandle {
  waitForReady(): Promise<void>;
  stop(): Promise<void>;
}

export function startBotProcess(): BotProcessHandle {
  let output = '';
  let exit:
    | {
        code: number | null;
        signal: NodeJS.Signals | null;
      }
    | undefined;

  const childProcess = spawn(
    process.execPath,
    ['--import', 'tsx', 'src/index.ts'],
    {
      cwd: process.cwd(),
      env: {
        ...process.env,
        LOG_LEVEL: 'debug',
        NODE_ENV: 'test',
      },
      stdio: ['ignore', 'pipe', 'pipe'],
    },
  );

  const appendOutput = (chunk: Buffer): void => {
    output += chunk.toString();
  };

  childProcess.stdout.on('data', appendOutput);
  childProcess.stderr.on('data', appendOutput);
  childProcess.once('exit', (code, signal) => {
    exit = { code, signal };
  });

  return {
    waitForReady: () =>
      waitForOutput(
        childProcess,
        () => output,
        () => exit,
      ),
    stop: () => stopBotProcess(childProcess, () => exit),
  };
}

function waitForOutput(
  childProcess: BotChildProcess,
  getOutput: () => string,
  getExit: () =>
    | {
        code: number | null;
        signal: NodeJS.Signals | null;
      }
    | undefined,
): Promise<void> {
  const deadline = Date.now() + DEFAULT_TIMEOUT_MS;

  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      const exit = getExit();

      if (exit) {
        clearInterval(interval);
        reject(
          new Error(
            `Bot process exited with code ${exit.code} and signal ${exit.signal}.\n${getOutput()}`,
          ),
        );
        return;
      }

      if (getOutput().includes(BOT_READY_LOG)) {
        clearInterval(interval);
        resolve();
        return;
      }

      if (Date.now() > deadline) {
        childProcess.kill('SIGTERM');
        clearInterval(interval);
        reject(
          new Error(`Timed out waiting for bot readiness.\n${getOutput()}`),
        );
      }
    }, 100);
  });
}

async function stopBotProcess(
  childProcess: BotChildProcess,
  getExit: () =>
    | {
        code: number | null;
        signal: NodeJS.Signals | null;
      }
    | undefined,
): Promise<void> {
  if (childProcess.killed || getExit()) {
    return;
  }

  childProcess.kill('SIGTERM');

  await new Promise<void>(resolve => {
    const timeout = setTimeout(() => {
      if (!getExit()) {
        childProcess.kill('SIGKILL');
      }

      resolve();
    }, 5_000);

    childProcess.once('exit', () => {
      clearTimeout(timeout);
      resolve();
    });
  });
}

type BotChildProcess = ChildProcessByStdio<null, Readable, Readable>;
