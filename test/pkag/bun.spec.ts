import { expect, it } from 'vitest'
import { parsePkAg } from '../../src/commands'

const agent = 'bun'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parsePkAg(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

it('empty', _('', 'bun'))
it('foo', _('foo', 'bun foo'))
it('run test', _('run test', 'bun run test'))
