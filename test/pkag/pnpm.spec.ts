import { expect, it } from 'vitest'
import { parsePkAg } from '../../src/commands'

const agent = 'pnpm'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parsePkAg(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

it('empty', _('', 'pnpm'))
it('foo', _('foo', 'pnpm foo'))
it('run test', _('run test', 'pnpm run test'))
