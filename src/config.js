import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ini from 'ini';
import { detect } from './detect';
const customRcPath = process.env.NI_CONFIG_FILE;
const home = process.platform === 'win32'
    ? process.env.USERPROFILE
    : process.env.HOME;
const defaultRcPath = path.join(home || '~/', '.nirc');
const rcPath = customRcPath || defaultRcPath;
const defaultConfig = {
    defaultAgent: 'prompt',
    globalAgent: 'npm',
};
let config;
export async function getConfig() {
    if (!config) {
        const agent = await detect({ programmatic: true });
        if (agent)
            config = { ...defaultConfig, defaultAgent: agent };
        else
            config = Object.assign({}, defaultConfig, ini.parse(fs.readFileSync(rcPath, 'utf-8')));
    }
    return config;
}
export async function getDefaultAgent(programmatic) {
    const { defaultAgent } = await getConfig();
    if (defaultAgent === 'prompt' && (programmatic || process.env.CI))
        return 'npm';
    return defaultAgent;
}
export async function getGlobalAgent() {
    const { globalAgent } = await getConfig();
    return globalAgent;
}
//# sourceMappingURL=config.js.map