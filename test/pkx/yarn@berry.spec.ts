import { expect, it } from 'vitest'
import { parsePkx } from '../../src/commands'

const agent = 'yarn@berry'
function _(arg: string, expected: string) {
  return () => {
    expect(
      parsePkx(agent, arg.split(' ').filter(Boolean)),
    ).toBe(
      expected,
    )
  }
}

it('single uninstall', _('esbuild', 'yarn dlx esbuild'))
it('multiple', _('esbuild --version', 'yarn dlx esbuild --version'))
