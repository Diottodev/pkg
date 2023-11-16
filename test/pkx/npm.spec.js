import { expect, it } from 'vitest';
import { parsePkx } from '../../src/commands';
const agent = 'npm';
function _(arg, expected) {
    return () => {
        expect(parsePkx(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single uninstall', _('esbuild', 'npx esbuild'));
it('multiple', _('esbuild --version', 'npx esbuild --version'));
//# sourceMappingURL=npm.spec.js.map