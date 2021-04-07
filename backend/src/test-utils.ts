export type MockFunctions<T extends any> = {
  [K in keyof T]: T[K] extends (...args: any) => any ? jest.Mock : T[K]
}
