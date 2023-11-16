/* eslint-disable no-console */
import { resolve } from 'node:path';
import process from 'node:process';
import prompts from '@posva/prompts';
import { execaCommand } from 'execa';
import c from 'kleur';
import { version } from '../package.json';
import { agents } from './agents';
import { getDefaultAgent, getGlobalAgent } from './config';
import { detect } from './detect';
import { getVoltaPrefix, remove } from './utils';
import { UnsupportedCommand, getCommand } from './parse';
const DEBUG_SIGN = '?';
export async function runCli(fn, options = {}) {
    const { args = process.argv.slice(2).filter(Boolean), } = options;
    try {
        await run(fn, args, options);
    }
    catch (error) {
        if (error instanceof UnsupportedCommand && !options.programmatic)
            console.log(c.red(`\u2717 ${error.message}`));
        if (!options.programmatic)
            process.exit(1);
        throw error;
    }
}
export async function getCliCommand(fn, args, options, cwd) {
    var _a;
    if (options === void 0) { options = {}; }
    if (cwd === void 0) { cwd = (_a = options.cwd) !== null && _a !== void 0 ? _a : process.cwd(); }
    const isGlobal = args.includes('-g');
    if (isGlobal)
        return await fn(await getGlobalAgent(), args);
    let agent = (await detect({ ...options, cwd })) || (await getDefaultAgent(options.programmatic));
    if (agent === 'prompt') {
        agent = (await prompts({
            name: 'agent',
            type: 'select',
            message: 'Choose the agent',
            choices: agents.filter(i => !i.includes('@')).map(value => ({ title: value, value })),
        })).agent;
        if (!agent)
            return;
    }
    return await fn(agent, args, {
        programmatic: options.programmatic,
        hasLock: Boolean(agent),
        cwd,
    });
}
export async function run(fn, args, options = {}) {
    var _a, _b;
    const debug = args.includes(DEBUG_SIGN);
    if (debug)
        remove(args, DEBUG_SIGN);
    let cwd = (_a = options.cwd) !== null && _a !== void 0 ? _a : process.cwd();
    if (args[0] === '-C') {
        cwd = resolve(cwd, args[1]);
        args.splice(0, 2);
    }
    if (args.length === 1 && (((_b = args[0]) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === '-v' || args[0] === '--version')) {
        const getCmd = (a) => agents.includes(a) ? getCommand(a, 'agent', ['-v']) : `${a} -v`;
        const getV = (a, o) => execaCommand(getCmd(a), o).then(e => e.stdout).then(e => e.startsWith('v') ? e : `v${e}`);
        const globalAgentPromise = getGlobalAgent();
        const globalAgentVersionPromise = globalAgentPromise.then(getV);
        const agentPromise = detect({ ...options, cwd }).then(a => a || '');
        const agentVersionPromise = agentPromise.then(a => a && getV(a, { cwd }));
        const nodeVersionPromise = getV('node', { cwd });
        console.log(`pkg  ${c.cyan(`v${version}`)}`);
        console.log(`node       ${c.green(await nodeVersionPromise)}`);
        const [agent, agentVersion] = await Promise.all([agentPromise, agentVersionPromise]);
        if (agent)
            console.log(`${agent.padEnd(10)} ${c.blue(agentVersion)}`);
        else
            console.log('agent      no lock file');
        const [globalAgent, globalAgentVersion] = await Promise.all([globalAgentPromise, globalAgentVersionPromise]);
        console.log(`${(`${globalAgent} -g`).padEnd(10)} ${c.blue(globalAgentVersion)}`);
        return;
    }
    if (args.length === 1 && (args[0] === '--version' || args[0] === '-v')) {
        console.log(`pkg v${version}`);
        return;
    }
    if (args.length === 1 && ['-h', '--help'].includes(args[0])) {
        const dash = c.dim('-');
        console.log(c.green(c.bold('@antfu/ni')) + c.dim(` use the right package manager v${version}\n`));
        console.log(`pk add    ${dash}  install`);
        console.log(`pkr    ${dash}  run`);
        console.log(`pkx   ${dash}  execute`);
        console.log(`pk up    ${dash}  upgrade`);
        console.log(`pk un   ${dash}  uninstall`);
        console.log(`pk clean   ${dash}  clean install`);
        console.log(`pk ag    ${dash}  agent alias`);
        console.log(`pk -v ${dash}  show used agent`);
        console.log(c.yellow('\ncheck https://github.com/Diottodev/pkg for more documentation.'));
        return;
    }
    let command = await getCliCommand(fn, args, options, cwd);
    if (!command)
        return;
    const voltaPrefix = getVoltaPrefix();
    if (voltaPrefix)
        command = voltaPrefix.concat(' ').concat(command);
    if (debug) {
        console.log(command);
        return;
    }
    await execaCommand(command, { stdio: 'inherit', cwd });
}
//# sourceMappingURL=runner.js.map