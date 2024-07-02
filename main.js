import repl from 'node:repl';
import * as spacetraders from './src/spacetraders.js';

// Start the REPL.
const replServer = repl.start({ useGlobal: true });

// Allows you to call functions defined in spacetraders.js from the REPL using
// spacetraders.<function>
replServer.context.spacetraders = spacetraders;
// Provide a shortcut in case you don't want to keep typing `spacetraders.`
replServer.context.st = spacetraders;
