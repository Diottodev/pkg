import { expect, it } from 'vitest';
import { parsePkx } from '../../src/commands';
const agent = 'pnpm';
function _(arg, expected) {
    return () => {
        expect(parsePkx(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single uninstall', _('esbuild', 'pnpm dlx esbuild'));
it('multiple', _('esbuild --version', 'pnpm dlx esbuild --version'));
//# sourceMappingURL=pnpm.spec.js.map