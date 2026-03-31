export type WebpackRequireContext = ((id: string) => unknown) & { keys: () => string[] };

/** Jest-only fake context backed by `globalThis.__jestWebpackPages` / `__jestWebpackModules`. */
export function createJestWebpackContext(kind: 'pages' | 'modules'): WebpackRequireContext {
  const pages =
    (globalThis as { __jestWebpackPages?: Record<string, unknown> }).__jestWebpackPages ?? {};
  const modules =
    (globalThis as { __jestWebpackModules?: Record<string, unknown> }).__jestWebpackModules ?? {};

  const map = kind === 'pages' ? pages : modules;

  const fn = (id: string) => {
    const entry = map[id];
    if (typeof entry === 'function') {
      return (entry as () => unknown)();
    }
    return entry ?? {};
  };

  const ctx = fn as WebpackRequireContext;
  ctx.keys = () => Object.keys(map);
  return ctx;
}
