import { expect, it } from 'vitest';
import { parsePkr } from '../../src/commands';
const agent = 'pnpm';
function _(arg, expected) {
    return () => {
        expect(parsePkr(agent, arg.split(' ').filter(Boolean))).toBe(expected);
    };
}
it('empty', _('', 'pnpm run start'));
it('if-present', _('test --if-present', 'pnpm run --if-present test'));
it('script', _('dev', 'pnpm run dev'));
it('script with arguments', _('build --watch -o', 'pnpm run build --watch -o'));
it('colon', _('build:dev', 'pnpm run build:dev'));
//# sourceMappingURL=pnpm.spec.js.map