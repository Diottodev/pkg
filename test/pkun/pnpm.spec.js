import { expect, it } from 'vitest';
import { parsePkUn } from '../../src/commands';
const agent = 'pnpm';
function _(arg, expected) {
    return () => {
        expect(parsePkUn(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('single add', _('axios', 'pnpm remove axios'));
it('multiple', _('eslint @types/node', 'pnpm remove eslint @types/node'));
it('-D', _('-D eslint @types/node', 'pnpm remove -D eslint @types/node'));
it('global', _('eslint -g', 'pnpm remove --global eslint'));
//# sourceMappingURL=pnpm.spec.js.map