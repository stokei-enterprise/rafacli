import { build } from 'gluegun';
import * as packageJson from '../package.json';
import { CLI_COMMAND_NAME } from './constants/info';

async function run(argv) {
  const cli = build()
    .brand(CLI_COMMAND_NAME)
    .src(__dirname)
    .plugins('./node_modules', {
      matching: CLI_COMMAND_NAME + '-*',
      hidden: true
    })
    .help()
    .version(packageJson.version)
    .create();
  const toolbox = await cli.run(argv);
  return toolbox;
}

module.exports = { run };
