import { expect, it } from 'vitest';
import { parsePkUn } from '../../src/commands';
const agent = 'bun';
function _(arg, expected) {
    return () => {
        expect(parsePkUn(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single uninstall', _('axios', 'bun remove axios'));
it('multiple', _('eslint @types/node', 'bun remove eslint @types/node'));
//# sourceMappingURL=bun.spec.js.map