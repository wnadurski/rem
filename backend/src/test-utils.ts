export type MockFunctions<T extends any> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? jest.Mock : T[K]
}

export const resolvePromiseWhenInvoked = <
  F extends (...args: any[]) => unknown
>(
  fn: F
): [Promise<void>, F] => {
  let cachedResolve: any
  const promise = new Promise<void>((resolve) => {
    cachedResolve = resolve
  })

  const newFn = (...args: any) => {
    const returned = fn(...args)
    cachedResolve?.()
    return returned
  }
  return [promise, newFn as any]
}
