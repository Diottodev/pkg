import { expect, it } from 'vitest';
import { parsePkx } from '../../src/commands';
const agent = 'bun';
function _(arg, expected) {
    return () => {
        expect(parsePkx(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single uninstall', _('esbuild', 'bunx esbuild'));
it('multiple', _('esbuild --version', 'bunx esbuild --version'));
//# sourceMappingURL=bun.spec.js.map