import { runSeed } from './data/runSeed';

async function execute() {
  await runSeed();
  process.exit(0);
}

execute();