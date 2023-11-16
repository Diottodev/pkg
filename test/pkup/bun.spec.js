import { expect, it } from 'vitest';
import { parsePkUp } from '../../src/commands';
const agent = 'bun';
function _(arg, expected) {
    return () => {
        expect(parsePkUp(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it.fails('empty', _('', null));
it.fails('interactive', _('-i', null));
it.fails('interactive latest', _('-i --latest', null));
//# sourceMappingURL=bun.spec.js.map