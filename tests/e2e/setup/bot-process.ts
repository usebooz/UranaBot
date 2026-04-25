import { spawn, type ChildProcessByStdio } from 'node:child_process';
import type { Readable } from 'node:stream';

export interface BotProcessHandle {
  getOutput(): string;
  hasExited(): boolean;
  stop(): Promise<void>;
}

export function startBotProcess(): BotProcessHandle {
  let output = '';
  let exited = false;

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
  childProcess.once('exit', () => {
    exited = true;
  });

  return {
    getOutput: () => output,
    hasExited: () => exited,
    stop: () => stopBotProcess(childProcess, () => exited),
  };
}

async function stopBotProcess(
  childProcess: BotChildProcess,
  hasExited: () => boolean,
): Promise<void> {
  if (childProcess.killed || hasExited()) {
    return;
  }

  childProcess.kill('SIGTERM');

  await new Promise<void>(resolve => {
    const timeout = setTimeout(() => {
      if (!hasExited()) {
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
