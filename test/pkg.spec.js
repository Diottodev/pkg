import { expect, it } from 'vitest';
import { getCommand } from '../src/commands';
it('wrong agent', () => {
    expect(() => {
        getCommand('idk', 'install', []);
    }).toThrow('Unsupported agent "idk"');
});
//# sourceMappingURL=pkg.spec.js.map