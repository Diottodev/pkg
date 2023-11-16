import { expect, it } from 'vitest';
import { parsePkg } from '../../src/commands';
const agent = 'npm';
function _(arg, expected) {
    return () => {
        expect(parsePkg(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'npm i'));
it('single add', _('axios', 'npm i axios'));
it('multiple', _('eslint @types/node', 'npm i eslint @types/node'));
it('-D', _('eslint @types/node -D', 'npm i eslint @types/node -D'));
it('global', _('eslint -g', 'npm i -g eslint'));
it('frozen', _('--frozen', 'npm ci'));
//# sourceMappingURL=npm.spec.js.map