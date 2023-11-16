# pkg

~~*`npm i` in a yarn project, again? F\*\*k!*~~

**pkg** - use the right package manager

<br>

<pre>
npm i -g <b>@nico-diotto-dev/pkg</b>
</pre>

<a href='https://docs.npmjs.com/cli/v6/commands/npm'>npm</a> · <a href='https://yarnpkg.com'>yarn</a> · <a href='https://pnpm.io/'>pnpm</a> · <a href='https://bun.sh/'>bun</a>


<br>


### `pkg` - install

```bash
pkg

# npm install
# yarn install
# pnpm install
# bun install
```

```bash
pkg vite

# npm i vite
# yarn add vite
# pnpm add vite
# bun add vite
```

```bash
pkg @types/node -D

# npm i @types/node -D
# yarn add @types/node -D
# pnpm add -D @types/node
# bun add -d @types/node
```

```bash
pkg --frozen

# npm ci
# yarn install --frozen-lockfile (Yarn 1)
# yarn install --immutable (Yarn Berry)
# pnpm install --frozen-lockfile
# bun install --no-save
```

```bash
pkg -g eslint

# npm i -g eslint
# yarn global add eslint (Yarn 1)
# pnpm add -g eslint
# bun add -g eslint

# this uses default agent, regardless your current working directory
```

<br>

### `pkr` - run

```bash
pkr dev --port=3000

# npm run dev -- --port=3000
# yarn run dev --port=3000
# pnpm run dev --port=3000
# bun run dev --port=3000
```

```bash
pkr

# interactively select the script to run
# supports https://www.npmjs.com/package/npm-scripts-info convention
```

```bash
pkr -

# rerun the last command
```

<br>

### `pkx` - download & execute

```bash
pkx vitest

# npx vitest
# yarn dlx vitest
# pnpm dlx vitest
# bunx vitest
```

<br>

### `pk up` - upgrade

```bash
pk up

# npm upgrade
# yarn upgrade (Yarn 1)
# yarn up (Yarn Berry)
# pnpm update
# bun update
```

```bash
pk up -i

# (not available for npm & bun)
# yarn upgrade-interactive (Yarn 1)
# yarn up -i (Yarn Berry)
# pnpm update -i
```

<br>

### `pk un` - uninstall

```bash
pk un webpack

# npm uninstall webpack
# yarn remove webpack
# pnpm remove webpack
# bun remove webpack
```

```bash
pk un -g silent

# npm uninstall -g silent
# yarn global remove silent
# pnpm remove -g silent
# bun remove -g silent
```

<br>

### `pk clean` - clean install

```bash
pk clean

# npm ci
# yarn install --frozen-lockfile
# pnpm install --frozen-lockfile
# bun install --no-save
```

if the corresponding node manager is not present, this command will install it globally along the way.

<br>

### `pk ag` - agent alias

```bash
pk ag

# npm
# yarn
# pnpm
# bun
```

```bash
pk ag run foo

# npm run foo
# yarn run foo
# pnpm run foo
# bun run foo
```

<br>

### Global Flags

```bash
# ?               | Print the command execution depends on the agent
pkg vite ?

# -C              | Change directory before running the command
pkg -C packages/foo vite
pkr -C playground dev

# -v, --version   | Show version number
pkg -v

# -h, --help      | Show help
pkg -h
```

<br>

### Config

```ini
; ~/.nirc

; fallback when no lock found
defaultAgent=npm # default "prompt"

; for global installs
globalAgent=npm
```

```bash
# ~/.bashrc

# custom configuration file path
export PKG_CONFIG_FILE="$HOME/.config/pkg/pkgrc"
```

<br>

### How?

**ni** assumes that you work with lockfiles (and you should)

Before it runs, it will detect your `yarn.lock` / `pnpm-lock.yaml` / `package-lock.json` / `bun.lockb` to know current package manager (or `packageManager` field in your packages.json if specified), and runs the [corresponding commands](https://github.com/Diottodev/pkg/blob/main/src/agents.ts).


