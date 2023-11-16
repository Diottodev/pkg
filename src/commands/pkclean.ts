import { parsePkg } from '../parse'
import { runCli } from '../runner'

runCli(
  (agent, _, hasLock) => parsePkg(agent, ['--frozen-if-present'], hasLock),
  { autoInstall: true },
)
