export type ResponseType<A, Keys extends keyof A = keyof A> = Keys extends any
  ? { code: Keys; data: A[Keys] }
  : never
