import { expect, it } from 'vitest'
import { parsePkUp } from '../../src/commands'

const agent = 'npm'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parsePkUp(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

it('empty', _('', 'npm update'))
